/**
 * O "maestro": coordena os agentes e gera cada versão do vídeo.
 *
 *   Diretor (roteiro) -> Narrador (vozes) -> Diretor de arte (imagens)
 *   -> Animador (clipes) -> Sonoplasta (música) -> Montador (linha do tempo)
 *   -> Revisor (confere os quadros) -> Render (MP4 final)
 *
 * Tudo o que é gerado fica num cache por conteúdo (hash): numa alteração por
 * chat, só o que mudou é gerado de novo.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ORCAMENTO, type CenaIA, type Pedido, type RoteiroIA, type VideoSpec, type VozConfig } from '../shared/spec';
import { estimarDuracaoFala, estimarPalavras, iniciosDasCenas, montarVideo, type AudioCena, type ImagemCena, type PalavraSeg } from '../shared/linhaDoTempo';
import { CONFIG } from './config';
import { temChave } from './chaves';
import * as armaz from './armazenamento';
import type { Ajustes, Custo, Etapa, Marca, Projeto } from './armazenamento';
import * as claude from './provedores/claude';
import * as eleven from './provedores/elevenlabs';
import * as gemini from './provedores/gemini';
import * as openai from './provedores/openai';
import * as fal from './provedores/fal';
import { roteiroLocal } from './provedores/roteiroLocal';
import { mensagemDiretor } from './prompts';
import { renderizarQuadros, renderizarVideo } from './render';
import { filaGeracao, filaRender } from './fila';
import { agora, duracaoMidia, ErroApp, hash, lerJson, gravarJson, tipoImagem } from './util';

/* ------------------------------------------------------------------ etapas e registros */

export const ETAPAS_CRIACAO: { id: string; nome: string }[] = [
  { id: 'roteiro', nome: 'Roteiro' },
  { id: 'voz', nome: 'Narração' },
  { id: 'imagens', nome: 'Imagens' },
  { id: 'clipes', nome: 'Cenas animadas' },
  { id: 'musica', nome: 'Música' },
  { id: 'montagem', nome: 'Montagem' },
  { id: 'revisao', nome: 'Revisão de qualidade' },
  { id: 'render', nome: 'Vídeo final (MP4)' },
];

const novasEtapas = (): Etapa[] => ETAPAS_CRIACAO.map((e) => ({ ...e, status: 'aguardando' as const }));

function etapa(id: string, etapaId: string, status: Etapa['status'], detalhe?: string) {
  armaz.mexerProjeto(id, (p) => {
    const e = p.etapas.find((x) => x.id === etapaId);
    if (e) {
      e.status = status;
      e.detalhe = detalhe;
    }
  });
}

function custo(id: string, n: number, c: Omit<Custo, 'em'>) {
  const reg: Custo = { ...c, usd: Math.round(c.usd * 10000) / 10000, em: agora() };
  armaz.mexerProjeto(id, (p) => p.versoes.find((v) => v.n === n)?.custos.push(reg));
  armaz.lancarCusto(id, reg);
}

const custoDaVersao = (p: Projeto, n: number) => (p.versoes.find((v) => v.n === n)?.custos ?? []).reduce((a, c) => a + c.usd, 0);

function falhou(id: string, e: unknown) {
  const msg = e instanceof ErroApp ? e.message : 'Erro inesperado. Tente de novo.';
  console.error(`[projeto ${id}]`, e);
  try {
    armaz.mexerProjeto(id, (p) => {
      p.status = 'erro';
      p.erro = msg;
      p.etapas.filter((x) => x.status === 'rodando').forEach((x) => { x.status = 'erro'; x.detalhe = msg; });
      p.mensagens.push({ de: 'diretor', texto: `Não consegui terminar: ${msg}`, em: agora() });
    });
  } catch { /* projeto apagado */ }
}

function verificarLimiteMensal() {
  const mes = armaz.custoDoMes().total;
  if (mes >= CONFIG.limiteCustoMes) throw new ErroApp(`O limite de gastos do mês foi atingido (US$ ${CONFIG.limiteCustoMes}). Aumente LIMITE_CUSTO_MES_USD na hospedagem para continuar.`, 402);
}

/* ------------------------------------------------------------------ arquivos */

const pasta = (id: string) => armaz.caminhos.projeto(id);
const cache = (id: string) => path.join(pasta(id), 'cache');
export const urlProjeto = (id: string, rel: string) => `/midia/p/${id}/${rel}`;

function lerRef(id: string, arquivo: string): { mime: 'image/jpeg' | 'image/png' | 'image/webp'; dados: Buffer } | null {
  const f = path.join(pasta(id), 'refs', path.basename(arquivo));
  if (!fs.existsSync(f)) return null;
  const dados = fs.readFileSync(f);
  const mime = tipoImagem(dados);
  return mime ? { mime, dados } : null;
}

/* ------------------------------------------------------------------ escolha de provedores */

function provedorVoz(a: Ajustes): 'elevenlabs' | 'gemini' | null {
  if (a.provedorVoz === 'nenhum') return null;
  if (a.provedorVoz === 'elevenlabs') return temChave('elevenlabs') ? 'elevenlabs' : null;
  if (a.provedorVoz === 'gemini') return temChave('gemini') ? 'gemini' : null;
  return temChave('elevenlabs') ? 'elevenlabs' : temChave('gemini') ? 'gemini' : null;
}

function provedorImagem(a: Ajustes): 'openai' | 'gemini' | null {
  if (a.provedorImagem === 'nenhum') return null;
  if (a.provedorImagem === 'openai') return temChave('openai') ? 'openai' : null;
  if (a.provedorImagem === 'gemini') return temChave('gemini') ? 'gemini' : null;
  return temChave('openai') ? 'openai' : temChave('gemini') ? 'gemini' : null;
}

/* ------------------------------------------------------------------ saneamento do roteiro */

/** Corrige o roteiro para respeitar o pedido, o orçamento e o que está disponível. */
export function sanear(r: RoteiroIA, p: Projeto, marca: Marca | null, ajustes: Ajustes): RoteiroIA {
  const roteiro: RoteiroIA = JSON.parse(JSON.stringify(r));
  const pedido = p.pedido;
  const refs = new Set(p.referencias.map((x) => x.id));
  const orc = ORCAMENTO[pedido.qualidade];
  const temImagem = !!provedorImagem(ajustes);
  const temVideo = temChave('fal');
  let gerar = 0;
  let animar = 0;
  roteiro.cenas = roteiro.cenas.slice(0, 14);
  if (!roteiro.cenas.length) throw new ErroApp('O roteiro veio sem cenas. Tente de novo.', 502);
  if (pedido.estilo !== 'auto') roteiro.estilo = pedido.estilo;
  if (pedido.musica !== 'auto') roteiro.musica.clima = pedido.musica;
  if (pedido.narracao === 'nao') roteiro.legendas = false;
  else if (pedido.legendas !== 'auto') roteiro.legendas = pedido.legendas === 'sim';
  if (marca?.cores[0]) roteiro.paleta.primaria = marca.cores[0];
  if (marca?.cores[1]) roteiro.paleta.destaque = marca.cores[1];

  for (const c of roteiro.cenas) {
    if (pedido.narracao === 'nao') {
      c.narracao = '';
      c.duracaoMinima = c.duracaoMinima ?? 2.8;
    }
    if (c.voz === 'secundaria' && !pedido.vozSecundaria) c.voz = 'principal';
    const im = c.imagem;
    if ((im.fonte === 'referencia' || im.fonte === 'editar') && (!im.referencia || !refs.has(im.referencia))) {
      im.fonte = im.descricao && im.fonte === 'editar' ? 'gerar' : 'nenhuma';
      im.referencia = null;
    }
    if (im.fonte === 'gerar' || im.fonte === 'editar') {
      if (!temImagem || gerar >= orc.imagens) {
        if (im.fonte === 'editar') im.fonte = 'referencia';
        else im.fonte = 'nenhuma';
      } else gerar++;
    }
    if (im.animar) {
      if (!temVideo || animar >= orc.clipes || im.fonte === 'mascote' || im.fonte === 'nenhuma') im.animar = false;
      else animar++;
    }
  }
  if (roteiro.cenas[roteiro.cenas.length - 1].layout !== 'cta') {
    roteiro.cenas.push({ ...roteiro.cenas[roteiro.cenas.length - 1], layout: 'cta', titulo: marca?.contato.whatsapp ? 'Chame no WhatsApp' : 'Venha conhecer', destaques: [], subtitulo: null, numero: null, itens: null, selo: null, narracao: '', imagem: { fonte: 'nenhuma', referencia: null, descricao: null, personagem: null, recorte: false, expressao: null, animar: false, movimento: null }, fundo: 'claro', duracaoMinima: 3.4 });
  }
  return roteiro;
}

/* ------------------------------------------------------------------ narração */

async function vozPadrao(provedor: 'elevenlabs' | 'gemini', a: Ajustes): Promise<VozConfig> {
  const salva = armaz.listarVozes().find((v) => v.id === a.vozPadrao && v.provedor === provedor) ?? armaz.listarVozes().find((v) => v.provedor === provedor);
  if (salva) return { provedor, vozId: salva.vozId, nome: salva.nome };
  if (provedor === 'gemini') return { provedor, vozId: 'Kore', nome: 'Kore' };
  const lista = await eleven.listarVozes();
  const pt = lista.find((v) => /portugu|brazil|brasil/i.test(`${v.nome} ${v.descricao}`)) ?? lista[0];
  if (!pt) throw new ErroApp('Nenhuma voz disponível na sua conta ElevenLabs.', 400);
  return { provedor, vozId: pt.vozId, nome: pt.nome };
}

async function gerarVozes(id: string, n: number, p: Projeto, roteiro: RoteiroIA, a: Ajustes): Promise<(AudioCena | null)[]> {
  const comFala = roteiro.cenas.some((c) => c.narracao.trim());
  if (p.pedido.narracao === 'nao' || !comFala) {
    etapa(id, 'voz', 'pulada', 'vídeo sem narração');
    return roteiro.cenas.map(() => null);
  }
  const prov = provedorVoz(a);
  if (!prov) {
    etapa(id, 'voz', 'pulada', 'sem chave de voz: tempos estimados, sem áudio');
    return roteiro.cenas.map((c) => {
      if (!c.narracao.trim()) return null;
      const d = estimarDuracaoFala(c.narracao);
      return { src: null, duracao: d, palavras: estimarPalavras(c.narracao, d) };
    });
  }
  etapa(id, 'voz', 'rodando', prov === 'elevenlabs' ? 'ElevenLabs' : 'Gemini');
  const escolher = async (c: CenaIA): Promise<VozConfig> => {
    const v = c.voz === 'secundaria' ? p.pedido.vozSecundaria : p.pedido.vozPrincipal;
    return v && v.provedor === prov ? v : vozPadrao(prov, a);
  };
  const saida: (AudioCena | null)[] = [];
  let geradas = 0;
  for (let i = 0; i < roteiro.cenas.length; i++) {
    const c = roteiro.cenas[i];
    const texto = c.narracao.trim();
    if (!texto) { saida.push(null); continue; }
    const voz = await escolher(c);
    const modelo = prov === 'elevenlabs' ? a.modeloVozElevenlabs : gemini.MODELO_VOZ;
    const chave = hash('voz', prov, voz.vozId, modelo, texto);
    const arqAudio = path.join(cache(id), `voz-${chave}.mp3`);
    const arqInfo = path.join(cache(id), `voz-${chave}.json`);
    let info = lerJson<{ duracao: number; palavras: PalavraSeg[] } | null>(arqInfo, null);
    if (!info || !fs.existsSync(arqAudio)) {
      fs.mkdirSync(cache(id), { recursive: true });
      etapa(id, 'voz', 'rodando', `cena ${i + 1} de ${roteiro.cenas.length}`);
      let palavras: PalavraSeg[] = [];
      if (prov === 'elevenlabs') {
        const ant = roteiro.cenas.slice(0, i).map((x) => x.narracao).filter(Boolean).slice(-1)[0];
        const prox = roteiro.cenas.slice(i + 1).map((x) => x.narracao).filter(Boolean)[0];
        const r = await eleven.narrar({ texto, vozId: voz.vozId, modelo, anterior: ant, proximo: prox });
        fs.writeFileSync(arqAudio, r.audio);
        palavras = r.palavras;
        custo(id, n, { etapa: 'voz', provedor: 'elevenlabs', descricao: `Narração cena ${i + 1} (${r.caracteres} caracteres)`, usd: r.usd });
      } else {
        const r = await gemini.narrar({ texto, vozId: voz.vozId });
        fs.writeFileSync(arqAudio, r.audio);
        custo(id, n, { etapa: 'voz', provedor: 'gemini', descricao: `Narração cena ${i + 1}`, usd: r.usd });
      }
      const duracao = await duracaoMidia(arqAudio);
      if (!palavras.length) palavras = estimarPalavras(texto, duracao);
      info = { duracao, palavras };
      gravarJson(arqInfo, info);
      geradas++;
    }
    saida.push({ src: urlProjeto(id, `cache/voz-${chave}.mp3`), duracao: info.duracao, palavras: info.palavras });
  }
  etapa(id, 'voz', 'ok', geradas ? `${geradas} falas geradas` : 'aproveitadas da versão anterior');
  return saida;
}

/* ------------------------------------------------------------------ imagens */

const ESTILO_IMAGEM: Record<RoteiroIA['estilo'], string> = {
  'fofo-3d': 'Render 3D fofo no estilo de filme de animação, formas arredondadas, materiais macios, iluminação suave de estúdio, cores vivas e alegres, altíssima qualidade.',
  moderno: 'Fotografia publicitária moderna, luz natural bonita, cores ricas, foco nítido, composição limpa.',
  impacto: 'Fotografia publicitária vibrante e contrastada, energia de oferta, cores saturadas, foco nítido.',
  elegante: 'Fotografia sofisticada e editorial, luz suave e quente, tons elegantes, profundidade de campo rasa.',
  minimalista: 'Composição minimalista, muito espaço vazio, fundo neutro, luz suave, elegância simples.',
};

function promptImagem(c: CenaIA, r: RoteiroIA, recorte: boolean, personagem: { nome: string; descricao: string } | null, temRefPersonagem: boolean, editando: boolean, formato: Pedido['formato']): string {
  const partes: string[] = [];
  if (editando) partes.push(`Edite a foto enviada: ${c.imagem.descricao ?? 'deixe a foto mais bonita e profissional'}. Mantenha o produto ou a pessoa principal idêntico, sem distorcer formas nem rótulos.`);
  else partes.push(c.imagem.descricao?.trim() || c.titulo || r.ideia);
  if (personagem) partes.push(`Personagem: ${personagem.nome} — ${personagem.descricao}.${temRefPersonagem ? ' Mantenha exatamente a mesma aparência do personagem da imagem de referência.' : ''}`);
  if (c.imagem.expressao) partes.push(`Expressão: ${c.imagem.expressao}.`);
  if (!editando) partes.push(ESTILO_IMAGEM[r.estilo]);
  partes.push(`Cores que combinem com ${r.paleta.primaria} e ${r.paleta.destaque}.`);
  if (recorte) partes.push('Objeto ou personagem isolado, inteiro e centralizado, com margem em volta, fundo totalmente transparente, sem sombra no chão.');
  else if (c.fundo === 'foto' && (formato === '9:16' || formato === '4:5')) partes.push('Enquadramento vertical para vídeo de celular, com o assunto principal no centro e área mais calma no topo e na base.');
  partes.push('Sem nenhum texto, letra, número, logotipo ou marca d\'água na imagem.');
  return partes.join(' ');
}

type ImagemGerada = { cena: number; arquivo: string; mime: string; tipo: 'recorte' | 'foto' };

/** PNG RGBA ou cinza+alfa (byte 25 do cabeçalho IHDR). */
const pngComTransparencia = (b: Buffer) => b[0] === 0x89 && b[1] === 0x50 && (b[25] === 6 || b[25] === 4);

async function gerarImagens(id: string, n: number, p: Projeto, roteiro: RoteiroIA, a: Ajustes, marca: Marca | null): Promise<(ImagemGerada | null)[]> {
  const prov = provedorImagem(a);
  const precisa = roteiro.cenas.some((c) => ['referencia', 'editar', 'gerar'].includes(c.imagem.fonte));
  if (!precisa) {
    etapa(id, 'imagens', 'pulada', 'sem imagens neste roteiro');
    return roteiro.cenas.map(() => null);
  }
  etapa(id, 'imagens', 'rodando');
  const saida: (ImagemGerada | null)[] = [];
  const mestres = new Map<string, { mime: string; dados: Buffer }>(); // personagem -> imagem de referência
  for (const pers of marca?.personagens ?? []) {
    if (!pers.imagem) continue;
    const f = path.join(armaz.caminhos.marca(marca!.id), path.basename(pers.imagem));
    if (fs.existsSync(f)) { const d = fs.readFileSync(f); const m = tipoImagem(d); if (m) mestres.set(pers.id, { mime: m, dados: d }); }
  }
  let geradas = 0;
  let avisos = 0;
  fs.mkdirSync(cache(id), { recursive: true });

  for (let i = 0; i < roteiro.cenas.length; i++) {
    const c = roteiro.cenas[i];
    const im = c.imagem;
    if (im.fonte === 'mascote' || im.fonte === 'nenhuma') { saida.push(null); continue; }
    const ref = im.referencia ? p.referencias.find((x) => x.id === im.referencia) : undefined;
    const refDados = ref ? lerRef(id, ref.arquivo) : null;
    const querRecorte = im.recorte;

    if (im.fonte === 'referencia' && refDados) {
      // foto do cliente: usa direto; se pediu recorte e a foto não tem transparência, tenta recortar
      if (querRecorte && refDados.mime !== 'image/png') {
        const chave = hash('recorte', ref!.arquivo, refDados.dados.length);
        const arq = path.join(cache(id), `rec-${chave}.png`);
        if (!fs.existsSync(arq)) {
          try {
            if (temChave('fal')) {
              const r = await fal.removerFundo(refDados);
              fs.writeFileSync(arq, r.imagem);
              custo(id, n, { etapa: 'imagens', provedor: 'fal', descricao: `Recorte de fundo (cena ${i + 1})`, usd: r.usd });
            } else if (prov === 'openai') {
              const r = await openai.gerarImagem({ prompt: 'Recorte o produto ou a pessoa principal desta foto, sem alterar nada nele, com fundo totalmente transparente.', referencias: [refDados], proporcao: '1:1', recorte: true, qualidade: a.qualidadeImagem });
              fs.writeFileSync(arq, r.imagem);
              custo(id, n, { etapa: 'imagens', provedor: 'openai', descricao: `Recorte de fundo (cena ${i + 1})`, usd: r.usd });
            }
          } catch (e) {
            avisos++;
            console.warn('recorte falhou', e);
          }
        }
        if (fs.existsSync(arq)) { saida.push({ cena: i, arquivo: `cache/rec-${chave}.png`, mime: 'image/png', tipo: 'recorte' }); continue; }
      }
      // PNG com transparência já é um recorte (ex.: produto sem fundo)
      saida.push({ cena: i, arquivo: `refs/${path.basename(ref!.arquivo)}`, mime: refDados.mime, tipo: pngComTransparencia(refDados.dados) ? 'recorte' : 'foto' });
      continue;
    }

    if ((im.fonte === 'gerar' || im.fonte === 'editar') && prov) {
      const editando = im.fonte === 'editar' && !!refDados;
      const personagem = im.personagem ? roteiro.personagens.find((x) => x.id === im.personagem) ?? marca?.personagens.find((x) => x.id === im.personagem) ?? null : null;
      const mestre = im.personagem ? mestres.get(im.personagem) : undefined;
      const referencias = [...(editando && refDados ? [refDados] : []), ...(mestre ? [mestre] : [])];
      const recorteNativo = querRecorte && prov === 'openai';
      const prompt = promptImagem(c, roteiro, querRecorte && prov === 'openai', personagem, !!mestre, editando, p.pedido.formato)
        + (querRecorte && prov !== 'openai' ? ' Fundo branco liso e uniforme.' : '');
      const proporcao = querRecorte ? '1:1' : p.pedido.formato;
      const chave = hash('img', prov, prompt, proporcao, querRecorte, referencias.map((r) => r.dados.length), a.qualidadeImagem);
      const arq = path.join(cache(id), `img-${chave}.png`);
      try {
        if (!fs.existsSync(arq)) {
          etapa(id, 'imagens', 'rodando', `cena ${i + 1} de ${roteiro.cenas.length}`);
          if (prov === 'openai') {
            const r = await openai.gerarImagem({ prompt, referencias, proporcao, recorte: recorteNativo, qualidade: a.qualidadeImagem });
            fs.writeFileSync(arq, r.imagem);
            custo(id, n, { etapa: 'imagens', provedor: 'openai', descricao: `${editando ? 'Edição' : 'Imagem'} cena ${i + 1} (${r.modelo})`, usd: r.usd });
          } else {
            const r = await gemini.gerarImagem({ prompt, referencias: referencias.map((x) => ({ mime: x.mime, base64: x.dados.toString('base64') })), proporcao, tamanho: querRecorte ? '1K' : '2K' });
            let dados = r.imagem;
            custo(id, n, { etapa: 'imagens', provedor: 'gemini', descricao: `${editando ? 'Edição' : 'Imagem'} cena ${i + 1}`, usd: r.usd });
            if (querRecorte && temChave('fal')) {
              const mime = tipoImagem(dados) ?? 'image/png';
              const rr = await fal.removerFundo({ mime, dados });
              dados = rr.imagem;
              custo(id, n, { etapa: 'imagens', provedor: 'fal', descricao: `Recorte de fundo (cena ${i + 1})`, usd: rr.usd });
            }
            fs.writeFileSync(arq, dados);
          }
          geradas++;
        }
        const dados = fs.readFileSync(arq);
        const recortada = querRecorte && (prov === 'openai' || temChave('fal'));
        if (im.personagem && !mestres.has(im.personagem)) mestres.set(im.personagem, { mime: tipoImagem(dados) ?? 'image/png', dados });
        saida.push({ cena: i, arquivo: `cache/img-${chave}.png`, mime: tipoImagem(dados) ?? 'image/png', tipo: recortada ? 'recorte' : 'foto' });
        continue;
      } catch (e) {
        avisos++;
        console.warn(`imagem da cena ${i + 1} falhou`, e);
        if (refDados) { saida.push({ cena: i, arquivo: `refs/${path.basename(ref!.arquivo)}`, mime: refDados.mime, tipo: 'foto' }); continue; }
      }
    }
    saida.push(null);
  }
  etapa(id, 'imagens', 'ok', [geradas ? `${geradas} imagens criadas` : 'fotos enviadas e imagens anteriores', avisos ? `${avisos} com problema (usei alternativa)` : ''].filter(Boolean).join(' · '));
  return saida;
}

/* ------------------------------------------------------------------ clipes animados */

async function gerarClipes(id: string, n: number, p: Projeto, roteiro: RoteiroIA, imagens: (ImagemGerada | null)[]): Promise<ImagemCena[]> {
  const base: ImagemCena[] = imagens.map((x) => (x ? { src: urlProjeto(id, x.arquivo), tipo: x.tipo } : null));
  const pedidos = roteiro.cenas.map((c, i) => (c.imagem.animar && imagens[i] ? i : -1)).filter((i) => i >= 0);
  if (!pedidos.length) { etapa(id, 'clipes', 'pulada', 'nenhuma cena animada'); return base; }
  if (!temChave('fal')) { etapa(id, 'clipes', 'pulada', 'sem chave da fal.ai'); return base; }
  etapa(id, 'clipes', 'rodando');
  let feitos = 0;
  for (const i of pedidos) {
    const projeto = armaz.obterProjeto(id);
    if (custoDaVersao(projeto, n) + 5 * fal.PRECO_SEGUNDO_VIDEO > CONFIG.limiteCustoVideo) {
      armaz.mexerProjeto(id, (pp) => pp.mensagens.push({ de: 'diretor', texto: `Pulei a animação da cena ${i + 1} para não passar do limite de US$ ${CONFIG.limiteCustoVideo} por vídeo.`, em: agora() }));
      continue;
    }
    const img = imagens[i]!;
    const dados = fs.readFileSync(path.join(pasta(id), img.arquivo));
    const movimento = roteiro.cenas[i].imagem.movimento || 'movimento de câmera lento e suave, aproximando devagar';
    const chave = hash('clipe', img.arquivo, movimento, fal.MODELO_VIDEO);
    const arq = path.join(cache(id), `clipe-${chave}.mp4`);
    try {
      if (!fs.existsSync(arq)) {
        etapa(id, 'clipes', 'rodando', `animando a cena ${i + 1} (leva 1 a 3 minutos)`);
        const r = await fal.animarImagem({ imagem: { mime: img.mime, dados }, movimento, segundos: 5 });
        fs.writeFileSync(arq, r.video);
        custo(id, n, { etapa: 'clipes', provedor: 'fal', descricao: `Clipe animado cena ${i + 1} (5 s)`, usd: r.usd });
      }
      base[i] = { src: urlProjeto(id, `cache/clipe-${chave}.mp4`), tipo: 'video' };
      feitos++;
    } catch (e) {
      console.warn('clipe falhou', e);
    }
  }
  etapa(id, 'clipes', 'ok', `${feitos} de ${pedidos.length} cenas animadas`);
  return base;
}

/* ------------------------------------------------------------------ música */

async function escolherMusica(id: string, n: number, roteiro: RoteiroIA, segundos: number, a: Ajustes): Promise<string | null> {
  if (roteiro.musica.clima === 'nenhuma') { etapa(id, 'musica', 'pulada', 'sem música'); return null; }
  if (a.musicaIA && temChave('elevenlabs')) {
    etapa(id, 'musica', 'rodando', 'compondo trilha exclusiva');
    const dur = Math.ceil((segundos + 2) / 5) * 5;
    const chave = hash('musica', roteiro.musica.descricao, roteiro.musica.clima, dur);
    const arq = path.join(cache(id), `musica-${chave}.mp3`);
    try {
      if (!fs.existsSync(arq)) {
        const audio = await eleven.compor({ descricao: `${roteiro.musica.descricao}. Instrumental, clima ${roteiro.musica.clima}, para vídeo curto de comércio local.`, segundos: dur });
        fs.mkdirSync(cache(id), { recursive: true });
        fs.writeFileSync(arq, audio);
        custo(id, n, { etapa: 'musica', provedor: 'elevenlabs', descricao: `Trilha exclusiva (${dur} s, créditos do plano)`, usd: 0 });
      }
      etapa(id, 'musica', 'ok', 'trilha exclusiva por IA');
      return urlProjeto(id, `cache/musica-${chave}.mp3`);
    } catch (e) {
      console.warn('música por IA falhou', e);
    }
  }
  etapa(id, 'musica', 'ok', `biblioteca: ${roteiro.musica.clima}`);
  return `musica/${roteiro.musica.clima}.mp3`;
}

/* ------------------------------------------------------------------ montagem + revisão */

function montar(id: string, p: Projeto, roteiro: RoteiroIA, audios: (AudioCena | null)[], imagens: ImagemCena[], musica: string | null, marca: Marca | null): VideoSpec {
  return montarVideo({
    roteiro, formato: p.pedido.formato, audios, imagens, musicaSrc: musica,
    logoSrc: marca?.logo ? `/midia/m/${marca.id}/${path.basename(marca.logo)}` : null,
    sfxBase: 'sfx/',
    marca: { nome: marca?.nome, contato: marca?.contato },
  });
}

export function quadrosChave(spec: VideoSpec): number[] {
  const inicios = iniciosDasCenas(spec);
  return spec.cenas.map((c, i) => Math.max(inicios[i], Math.min(inicios[i] + c.duracao - (spec.cenas[i + 1]?.transicaoFrames ?? 0) - 4, inicios[i] + c.marca + 45)));
}

function aplicarRevisao(roteiro: RoteiroIA, rev: claude.Revisao): { roteiro: RoteiroIA; mudou: string[] } {
  const novo: RoteiroIA = JSON.parse(JSON.stringify(roteiro));
  const mudou: string[] = [];
  for (const prob of rev.problemas.slice(0, 8)) {
    const c = novo.cenas[prob.cena - 1];
    if (!c) continue;
    const k = prob.correcao;
    let alterou = false;
    if (k.titulo && k.titulo !== c.titulo) { c.titulo = k.titulo; alterou = true; }
    if (k.subtitulo && k.subtitulo !== c.subtitulo) { c.subtitulo = k.subtitulo; alterou = true; }
    if (k.destaques) { c.destaques = k.destaques; alterou = true; }
    if (k.fundo && k.fundo !== c.fundo && !(k.fundo === 'foto' && c.imagem.fonte === 'nenhuma')) { c.fundo = k.fundo; alterou = true; }
    if (k.layout && k.layout !== c.layout && (prob.cena < novo.cenas.length || k.layout === 'cta')) { c.layout = k.layout; alterou = true; }
    if (alterou) mudou.push(`cena ${prob.cena}: ${prob.problema}`);
  }
  return { roteiro: novo, mudou };
}

/* ------------------------------------------------------------------ produção de uma versão */

async function produzir(id: string, n: number) {
  verificarLimiteMensal();
  const p = armaz.obterProjeto(id);
  const versao = p.versoes.find((v) => v.n === n);
  if (!versao) throw new ErroApp('Versão não encontrada', 404);
  const marca = armaz.obterMarca(p.pedido.marcaId);
  const a = armaz.lerAjustes();
  let roteiro = versao.roteiro;

  const audios = await gerarVozes(id, n, p, roteiro, a);
  const imagens = await gerarImagens(id, n, p, roteiro, a, marca);
  const finais = await gerarClipes(id, n, p, roteiro, imagens);
  const previa = montar(id, p, roteiro, audios, finais, null, marca);
  const musica = await escolherMusica(id, n, roteiro, previa.duracaoTotal / previa.fps, a);

  etapa(id, 'montagem', 'rodando');
  let spec = montar(id, p, roteiro, audios, finais, musica, marca);
  etapa(id, 'montagem', 'ok', `${spec.cenas.length} cenas · ${(spec.duracaoTotal / spec.fps).toFixed(1)} s`);

  if (p.pedido.revisar && temChave('anthropic')) {
    etapa(id, 'revisao', 'rodando', 'conferindo cada cena');
    try {
      const quadros = await renderizarQuadros(spec, quadrosChave(spec));
      const r = await claude.revisar(roteiro, quadros.map((b, i) => ({ mime: 'image/jpeg' as const, base64: b.toString('base64'), rotulo: `Cena ${i + 1}:` })));
      custo(id, n, { etapa: 'revisao', provedor: 'anthropic', descricao: `Revisão de qualidade (${quadros.length} quadros)`, usd: r.usd });
      const { roteiro: corrigido, mudou } = r.dados.ok ? { roteiro, mudou: [] } : aplicarRevisao(roteiro, r.dados);
      if (mudou.length) {
        roteiro = corrigido;
        spec = montar(id, p, roteiro, audios, finais, musica, marca);
        armaz.mexerProjeto(id, (pp) => pp.mensagens.push({ de: 'diretor', texto: `Revisei o vídeo e ajustei: ${mudou.join('; ')}.`, em: agora() }));
      }
      etapa(id, 'revisao', 'ok', mudou.length ? `${mudou.length} ajuste(s)` : 'tudo certo');
    } catch (e) {
      console.warn('revisão falhou', e);
      etapa(id, 'revisao', 'pulada', 'não foi possível revisar agora');
    }
  } else etapa(id, 'revisao', 'pulada', temChave('anthropic') ? 'desligada no pedido' : 'precisa da chave do Claude');

  armaz.mexerProjeto(id, (pp) => {
    const v = pp.versoes.find((x) => x.n === n)!;
    v.roteiro = roteiro;
    v.spec = spec;
    pp.versaoAtual = n;
    pp.titulo = roteiro.titulo || pp.titulo;
  });
  renderizar(id, n);
}

/* ------------------------------------------------------------------ comandos públicos */

export function novoProjeto(pedido: Pedido, referencias: Projeto['referencias'], idPronto: string): Projeto {
  const p: Projeto = {
    id: idPronto, titulo: pedido.briefing.slice(0, 60), criadoEm: agora(), atualizadoEm: agora(), pedido, referencias,
    versoes: [], versaoAtual: 0, status: 'gerando', etapas: novasEtapas(), erro: null,
    mensagens: [{ de: 'voce', texto: pedido.briefing, em: agora() }],
  };
  armaz.salvarProjeto(p);
  return p;
}

export function criar(id: string) {
  filaGeracao.rodar(async () => {
    verificarLimiteMensal();
    const p = armaz.obterProjeto(id);
    const marca = armaz.obterMarca(p.pedido.marcaId);
    const a = armaz.lerAjustes();
    etapa(id, 'roteiro', 'rodando', temChave('anthropic') ? 'o Diretor está escrevendo' : 'modo demonstração');
    let roteiro: RoteiroIA;
    let custoRoteiro: Omit<Custo, 'em'> | null = null;
    if (temChave('anthropic')) {
      const imagens = p.referencias.slice(0, 10).map((r) => {
        const d = lerRef(id, r.arquivo);
        return d ? { mime: d.mime, base64: d.dados.toString('base64'), rotulo: `Foto ${r.id}${r.descricao ? ` (${r.descricao})` : ''}:` } : null;
      }).filter((x): x is claude.ImagemEntrada => !!x);
      const orc = ORCAMENTO[p.pedido.qualidade];
      const prov = provedorImagem(a);
      const mensagem = mensagemDiretor({
        pedido: p.pedido, marca, referencias: p.referencias, personagens: marca?.personagens ?? [],
        vozes: { principal: p.pedido.vozPrincipal?.nome ?? null, secundaria: p.pedido.vozSecundaria?.nome ?? null },
        podeGerar: prov ? orc.imagens : 0, podeAnimar: temChave('fal') ? orc.clipes : 0,
      });
      const r = await claude.dirigir(mensagem, imagens);
      roteiro = r.dados;
      custoRoteiro = { etapa: 'roteiro', provedor: 'anthropic', descricao: `Roteiro (${r.tokens.entrada} + ${r.tokens.saida} tokens, ${r.modelo})`, usd: r.usd };
    } else {
      roteiro = roteiroLocal(p.pedido, marca, p.referencias);
    }
    roteiro = sanear(roteiro, p, marca, a);
    armaz.mexerProjeto(id, (pp) => {
      pp.versoes.push({ n: 1, criadaEm: agora(), origem: 'criacao', roteiro, spec: null, render: null, custos: [] });
      pp.versaoAtual = 1;
      pp.titulo = roteiro.titulo || pp.titulo;
    });
    if (custoRoteiro) custo(id, 1, custoRoteiro);
    etapa(id, 'roteiro', 'ok', `${roteiro.cenas.length} cenas${temChave('anthropic') ? '' : ' (modo demonstração)'}`);
    await produzir(id, 1);
  }).catch((e) => falhou(id, e));
}

export function editarPorChat(id: string, texto: string, novasRefs: string[]) {
  armaz.mexerProjeto(id, (p) => {
    p.mensagens.push({ de: 'voce', texto, em: agora() });
    p.status = 'gerando';
    p.erro = null;
    p.etapas = novasEtapas();
  });
  filaGeracao.rodar(async () => {
    verificarLimiteMensal();
    if (!temChave('anthropic')) throw new ErroApp('Para pedir alterações por mensagem, configure a chave do Claude em Ajustes.', 400);
    const p = armaz.obterProjeto(id);
    const atual = p.versoes.find((v) => v.n === p.versaoAtual) ?? p.versoes[p.versoes.length - 1];
    if (!atual) throw new ErroApp('Este projeto ainda não tem roteiro.', 400);
    const marca = armaz.obterMarca(p.pedido.marcaId);
    const a = armaz.lerAjustes();
    etapa(id, 'roteiro', 'rodando', 'o Diretor está ajustando');
    const orc = ORCAMENTO[p.pedido.qualidade];
    const contexto = [
      `ORÇAMENTO: até ${provedorImagem(a) ? orc.imagens : 0} cenas com imagem "gerar"/"editar" e até ${temChave('fal') ? orc.clipes : 0} cenas animadas.`,
      `FOTOS DISPONÍVEIS: ${p.referencias.map((r) => r.id).join(', ') || 'nenhuma'}${novasRefs.length ? ` (novas, anexadas: ${novasRefs.join(', ')})` : ''}.`,
      marca ? `MARCA: ${marca.nome}.` : '',
    ].filter(Boolean).join('\n');
    const imagens = novasRefs.map((rid) => {
      const r = p.referencias.find((x) => x.id === rid);
      const d = r ? lerRef(id, r.arquivo) : null;
      return d ? { mime: d.mime, base64: d.dados.toString('base64'), rotulo: `Foto nova ${rid}:` } : null;
    }).filter((x): x is claude.ImagemEntrada => !!x);
    const r = await claude.editar({ roteiro: atual.roteiro, pedido: texto, contexto, imagens });
    const roteiro = sanear(r.dados.roteiro, p, marca, a);
    const n = Math.max(...p.versoes.map((v) => v.n)) + 1;
    armaz.mexerProjeto(id, (pp) => {
      pp.versoes.push({ n, criadaEm: agora(), origem: 'chat', pedidoChat: texto, resumo: r.dados.resumo, roteiro, spec: null, render: null, custos: [] });
      pp.mensagens.push({ de: 'diretor', texto: r.dados.resumo, em: agora() });
    });
    custo(id, n, { etapa: 'roteiro', provedor: 'anthropic', descricao: `Alteração por chat (${r.tokens.entrada} + ${r.tokens.saida} tokens)`, usd: r.usd });
    etapa(id, 'roteiro', 'ok', 'roteiro ajustado');
    await produzir(id, n);
  }).catch((e) => falhou(id, e));
}

export function renderizar(id: string, n: number) {
  armaz.mexerProjeto(id, (p) => {
    p.status = 'renderizando';
    const e = p.etapas.find((x) => x.id === 'render');
    if (e) { e.status = 'aguardando'; e.detalhe = filaRender.ocupados ? 'na fila' : undefined; }
  });
  filaRender.rodar(async () => {
    const p = armaz.obterProjeto(id);
    const v = p.versoes.find((x) => x.n === n);
    if (!v?.spec) throw new ErroApp('Esta versão ainda não foi montada.', 400);
    etapa(id, 'render', 'rodando', '0%');
    const saida = path.join(pasta(id), 'renders', `v${n}.mp4`);
    let ultimo = 0;
    const inicio = Date.now();
    await renderizarVideo(v.spec, saida, (pr) => {
      const pc = Math.floor(pr * 100);
      if (pc >= ultimo + 5) { ultimo = pc; etapa(id, 'render', 'rodando', `${pc}%`); }
    });
    const capa = path.join(pasta(id), 'renders', `capa-v${n}.jpg`);
    const [jpg] = await renderizarQuadros(v.spec, [quadrosChave(v.spec)[0]]);
    if (jpg) fs.writeFileSync(capa, jpg);
    armaz.mexerProjeto(id, (pp) => {
      const vv = pp.versoes.find((x) => x.n === n)!;
      vv.render = { arquivo: `renders/v${n}.mp4`, capa: `renders/capa-v${n}.jpg`, criadoEm: agora(), segundos: Math.round(v.spec!.duracaoTotal / v.spec!.fps) };
      pp.status = 'pronto';
      pp.erro = null;
      const e = pp.etapas.find((x) => x.id === 'render');
      if (e) { e.status = 'ok'; e.detalhe = `pronto em ${Math.round((Date.now() - inicio) / 1000)} s`; }
    });
  }).catch((e) => falhou(id, e));
}

/** Tenta de novo do ponto em que parou. */
export function retomar(id: string) {
  const p = armaz.obterProjeto(id);
  const v = p.versoes.find((x) => x.n === p.versaoAtual) ?? p.versoes[p.versoes.length - 1];
  armaz.mexerProjeto(id, (pp) => {
    pp.status = 'gerando';
    pp.erro = null;
    pp.etapas.forEach((e) => { if (e.status === 'erro' || e.status === 'rodando') { e.status = 'aguardando'; e.detalhe = undefined; } });
  });
  if (!v) return criar(id);
  if (!v.spec) {
    filaGeracao.rodar(() => produzir(id, v.n)).catch((e) => falhou(id, e));
    return;
  }
  renderizar(id, v.n);
}

/** Na inicialização: trabalhos interrompidos por reinício ficam marcados para tentar de novo. */
export function recuperarInterrompidos() {
  for (const p of armaz.listarProjetos()) {
    if (p.status === 'gerando' || p.status === 'renderizando') {
      armaz.mexerProjeto(p.id, (pp) => {
        pp.status = 'erro';
        pp.erro = 'O servidor reiniciou no meio do trabalho. Toque em "Tentar de novo".';
        pp.etapas.forEach((e) => { if (e.status === 'rodando') e.status = 'erro'; });
      });
    }
  }
}
