import React, { useEffect, useMemo, useRef, useState } from 'react';
import { zipSync, strToU8 } from 'fflate';
import modelos from '../../../src/shared/modelos.json';
import { FONTES_SITE, MODELOS_BASE, RECURSOS_SITE, gerarSite, paginaParaPrevia, siteExemplo, siteVazio, validarSite, type ModeloBase, type RecursoId, type SiteSpec } from '../../../src/shared/sites';
import { ITENS_PRECO, PACOTES, PARAM_PADRAO, brl, calcular, itensDeProjeto, itensDoSite, proposta, type ParamPreco } from '../../../src/shared/precos';
import { baixar } from '../logoExport';
import { ler, gravar } from '../guardar';
import { Chips, Icone, Interruptor, STANDALONE, Topo, useToast } from '../ui';

type Aba = 'criar' | 'modelos' | 'orcamento';
const NOMES_PROJETO: Record<string, string> = { 'lang-motos': 'Lang Motos', 'San-comercio': 'San Comércio', 'remop-retifica': 'Remop Retífica' };
const MODELO_DO_PROJETO: Record<string, ModeloBase> = { 'lang-motos': 'oficina', 'San-comercio': 'catalogo', 'remop-retifica': 'servicos' };

export const Sites: React.FC = () => {
  const [aba, setAba] = useState<Aba>('criar');
  const [spec, setSpec] = useState<SiteSpec>(() => ler('site.spec', siteVazio('catalogo')));
  useEffect(() => { gravar('site.spec', spec); }, [spec]);
  return (
    <div className="pilha">
      <Topo titulo="Sites" />
      <Chips opcoes={[{ v: 'criar' as Aba, t: 'Criar site' }, { v: 'modelos' as Aba, t: 'Modelos aprendidos' }, { v: 'orcamento' as Aba, t: 'Orçamento' }]} valor={aba} aoMudar={setAba} />
      {aba === 'criar' && <Criar spec={spec} setSpec={setSpec} />}
      {aba === 'modelos' && <Modelos aoUsar={(m) => { setSpec((s) => ({ ...siteVazio(m), nome: s.nome, contato: s.contato, cidade: s.cidade })); setAba('criar'); }} />}
      {aba === 'orcamento' && <Orcamento spec={spec} />}
    </div>
  );
};

/* ------------------------------------------------------------------ criar */

const Campo: React.FC<{ rotulo: string; valor: string; aoMudar: (v: string) => void; dica?: string; multi?: boolean; tipo?: string; ph?: string }> = ({ rotulo, valor, aoMudar, dica, multi, tipo, ph }) => (
  <label className="campo"><span>{rotulo}</span>
    {multi ? <textarea className="entrada" rows={3} value={valor} onChange={(e) => aoMudar(e.target.value)} placeholder={ph} /> : <input className="entrada" type={tipo ?? 'text'} inputMode={tipo === 'tel' ? 'tel' : undefined} value={valor} onChange={(e) => aoMudar(e.target.value)} placeholder={ph} />}
    {dica && <span className="dica">{dica}</span>}
  </label>
);

const linhas = (t: string) => t.split('\n').map((x) => x.trim()).filter(Boolean);

const Criar: React.FC<{ spec: SiteSpec; setSpec: (s: SiteSpec) => void }> = ({ spec, setSpec }) => {
  const toast = useToast();
  const [gerado, setGerado] = useState<Record<string, string> | null>(null);
  const set = (p: Partial<SiteSpec>) => setSpec({ ...spec, ...p });
  const contato = (p: Partial<SiteSpec['contato']>) => set({ contato: { ...spec.contato, ...p } });
  const avisos = useMemo(() => validarSite(spec), [spec]);
  const erros = avisos.filter((a) => a.nivel === 'erro');
  const m = MODELOS_BASE[spec.modelo];

  const gerar = () => {
    if (erros.length) { toast(erros[0].texto); return; }
    setGerado(gerarSite(spec));
    setTimeout(() => document.getElementById('previa-site')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <>
      <section className="cartao pilha-p">
        <div className="secao-titulo"><span className="num">1</span>Modelo de partida</div>
        <p className="dica">Cada modelo nasceu da análise de um site que já fizemos. Ele só define os recursos e o visual iniciais: tudo pode ser mudado.</p>
        <div className="opcoes">
          {(Object.keys(MODELOS_BASE) as ModeloBase[]).map((k) => (
            <button key={k} type="button" className={`opcao ${spec.modelo === k ? 'ativo' : ''}`} onClick={() => setSpec({ ...siteVazio(k), nome: spec.nome, slogan: spec.slogan, segmento: spec.segmento, cidade: spec.cidade, descricao: spec.descricao, historia: spec.historia, contato: spec.contato, horario: spec.horario, itens: spec.itens, diferenciais: spec.diferenciais, passos: spec.passos, faq: spec.faq, numeros: spec.numeros, dominio: spec.dominio })}>
              <div className="cresce"><div className="titulo">{MODELOS_BASE[k].nome}</div><div className="desc">{MODELOS_BASE[k].descricao} <i>(base: {MODELOS_BASE[k].origem})</i></div></div>
            </button>
          ))}
        </div>
        <button className="botao pequeno contorno" onClick={() => setSpec(siteExemplo(spec.modelo))}>Preencher com exemplo fictício</button>
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">2</span>O negócio</div>
        <Campo rotulo="Nome" valor={spec.nome} aoMudar={(v) => set({ nome: v })} ph="Ex.: Mecânica do João" />
        <Campo rotulo="Frase de efeito" valor={spec.slogan} aoMudar={(v) => set({ slogan: v })} ph="Ex.: Seu carro em boas mãos" />
        <Campo rotulo="Ramo" valor={spec.segmento} aoMudar={(v) => set({ segmento: v })} ph="Ex.: Oficina mecânica" />
        <Campo rotulo="Cidade" valor={spec.cidade} aoMudar={(v) => set({ cidade: v })} ph="Ex.: Itapetininga - SP" />
        <Campo rotulo="Descrição (aparece no topo e no Google)" valor={spec.descricao} aoMudar={(v) => set({ descricao: v })} multi />
        <Campo rotulo="História (página Sobre)" valor={spec.historia} aoMudar={(v) => set({ historia: v })} multi dica="Escreva só fatos reais, combinados com o dono." />
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">3</span>Contatos e horário</div>
        <Campo rotulo="WhatsApp (com DDD)" valor={spec.contato.whatsapp} aoMudar={(v) => contato({ whatsapp: v })} tipo="tel" ph="(11) 91234-5678" />
        <Campo rotulo="Telefone fixo" valor={spec.contato.telefone} aoMudar={(v) => contato({ telefone: v })} tipo="tel" />
        <Campo rotulo="E-mail" valor={spec.contato.email} aoMudar={(v) => contato({ email: v })} />
        <Campo rotulo="Instagram" valor={spec.contato.instagram} aoMudar={(v) => contato({ instagram: v })} ph="@seunegocio" />
        <Campo rotulo="Endereço" valor={spec.contato.endereco} aoMudar={(v) => contato({ endereco: v })} />
        <Campo rotulo="Segunda a sexta" valor={spec.horario.semana} aoMudar={(v) => set({ horario: { ...spec.horario, semana: v } })} ph="09:00-18:00 (vazio = fechado)" />
        <Campo rotulo="Sábado" valor={spec.horario.sabado} aoMudar={(v) => set({ horario: { ...spec.horario, sabado: v } })} ph="09:00-13:00" />
        <Campo rotulo="Domingo" valor={spec.horario.domingo} aoMudar={(v) => set({ horario: { ...spec.horario, domingo: v } })} />
        <Campo rotulo="Domínio (quando tiver)" valor={spec.dominio} aoMudar={(v) => set({ dominio: v })} ph="www.seunegocio.com.br" />
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">4</span>{m.rotuloItens}</div>
        {spec.itens.map((it, i) => (
          <div key={i} className="cartao-plano pilha-p">
            <input className="entrada" value={it.titulo} placeholder={`Nome do ${m.rotuloItem}`} onChange={(e) => set({ itens: spec.itens.map((x, j) => (j === i ? { ...x, titulo: e.target.value } : x)) })} />
            <input className="entrada" value={it.descricao} placeholder="Descrição curta" onChange={(e) => set({ itens: spec.itens.map((x, j) => (j === i ? { ...x, descricao: e.target.value } : x)) })} />
            <div className="linha"><input className="entrada cresce" value={it.categoria} placeholder="Categoria (para filtrar)" onChange={(e) => set({ itens: spec.itens.map((x, j) => (j === i ? { ...x, categoria: e.target.value } : x)) })} />
              <button className="icone-botao" aria-label="Remover" onClick={() => set({ itens: spec.itens.filter((_, j) => j !== i) })}><Icone nome="lixo" tam={18} /></button></div>
          </div>
        ))}
        <button className="botao contorno" onClick={() => set({ itens: [...spec.itens, { titulo: '', descricao: '', categoria: '' }] })}><Icone nome="mais" /> Adicionar {m.rotuloItem}</button>
        <Campo rotulo="Diferenciais (um por linha)" valor={spec.diferenciais.join('\n')} aoMudar={(v) => set({ diferenciais: v.split('\n') })} multi />
        <Campo rotulo="Como funciona, passo a passo (um por linha)" valor={spec.passos.join('\n')} aoMudar={(v) => set({ passos: v.split('\n') })} multi />
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">5</span>Recursos</div>
        {RECURSOS_SITE.map((r) => (
          <label key={r.id} className="linha-entre"><span className="pilha-p" style={{ gap: 0 }}><span className="forte pequeno">{r.nome}</span><span className="dica">{r.dica}</span></span>
            <Interruptor ligado={spec.recursos[r.id]} aoMudar={(v) => set({ recursos: { ...spec.recursos, [r.id as RecursoId]: v } })} rotulo={r.nome} /></label>
        ))}
        {spec.recursos.numeros && (
          <Campo rotulo="Números (um por linha: valor | sufixo | texto)" valor={spec.numeros.map((n) => `${n.valor} | ${n.sufixo} | ${n.rotulo}`).join('\n')} multi ph="15 | anos | de experiência"
            aoMudar={(v) => set({ numeros: linhas(v).map((l) => { const [a, b, c] = l.split('|').map((x) => x.trim()); return { valor: Number(a.replace(/\D/g, '')) || 0, sufixo: b ? ` ${b}`.replace(/^ ([+%])/, '$1') : '', rotulo: c ?? '' }; }) })} />
        )}
        {spec.recursos.faq && (
          <Campo rotulo="Perguntas (uma por linha: pergunta | resposta)" valor={spec.faq.map((f) => `${f.p} | ${f.r}`).join('\n')} multi
            aoMudar={(v) => set({ faq: linhas(v).map((l) => { const [p, ...r] = l.split('|'); return { p: p.trim(), r: r.join('|').trim() }; }) })} />
        )}
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">6</span>Visual</div>
        <div className="linha quebra">
          <label className="linha pequeno"><input type="color" className="cor" value={spec.cores.primaria} onChange={(e) => set({ cores: { ...spec.cores, primaria: e.target.value.toUpperCase() } })} />Cor principal</label>
          <label className="linha pequeno"><input type="color" className="cor" value={spec.cores.acento} onChange={(e) => set({ cores: { ...spec.cores, acento: e.target.value.toUpperCase() } })} />Destaque</label>
        </div>
        <Chips opcoes={[{ v: 'claro' as const, t: 'Fundo claro' }, { v: 'escuro' as const, t: 'Fundo escuro' }]} valor={spec.tema} aoMudar={(v) => set({ tema: v })} />
        <Chips opcoes={(Object.keys(FONTES_SITE) as (keyof typeof FONTES_SITE)[]).map((k) => ({ v: k, t: FONTES_SITE[k].nome }))} valor={spec.fontes} aoMudar={(v) => set({ fontes: v })} />
      </section>

      {avisos.map((a, i) => <div key={i} className={`aviso ${a.nivel === 'erro' ? 'erro' : ''}`}><Icone nome="info" /><span>{a.texto}</span></div>)}
      <button className="botao primario grande largo" onClick={gerar}><Icone nome="raio" /> Gerar site</button>
      {gerado && <Previa arquivos={gerado} nome={spec.nome} />}
    </>
  );
};

const Previa: React.FC<{ arquivos: Record<string, string>; nome: string }> = ({ arquivos, nome }) => {
  const toast = useToast();
  const paginas = ['index.html', 'institucional.html', 'localizacao.html', ...(arquivos['privacidade.html'] ? ['privacidade.html'] : [])];
  const rotulo: Record<string, string> = { 'index.html': 'Início', 'institucional.html': 'Sobre', 'localizacao.html': 'Localização', 'privacidade.html': 'Privacidade' };
  const [pagina, setPagina] = useState('index.html');
  const [largura, setLargura] = useState<'cel' | 'desk'>('cel');
  const doc = useMemo(() => paginaParaPrevia(arquivos, pagina), [arquivos, pagina]);
  useEffect(() => {
    const f = (e: MessageEvent) => { const p = (e.data as { pagina?: string })?.pagina; if (p && paginas.includes(p)) setPagina(p); };
    window.addEventListener('message', f);
    return () => window.removeEventListener('message', f);
  }); // eslint-disable-line react-hooks/exhaustive-deps
  const zip = () => {
    const dados: Record<string, Uint8Array> = {};
    for (const [n, c] of Object.entries(arquivos)) dados[n] = strToU8(c);
    const slug = nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'site';
    baixar(new Blob([zipSync(dados) as BlobPart], { type: 'application/zip' }), `site-${slug}.zip`);
    toast(STANDALONE ? 'Neste link o download é bloqueado. No app publicado ele baixa direto.' : 'ZIP baixado.');
  };
  return (
    <section id="previa-site" className="cartao pilha">
      <div className="linha-entre"><h2>Prévia do site</h2><span className="selo ok">{Object.keys(arquivos).length} arquivos</span></div>
      <Chips opcoes={paginas.map((p) => ({ v: p, t: rotulo[p] }))} valor={pagina} aoMudar={setPagina} />
      <Chips opcoes={[{ v: 'cel' as const, t: 'Celular' }, { v: 'desk' as const, t: 'Computador' }]} valor={largura} aoMudar={setLargura} />
      <div className={`moldura-site ${largura}`}><iframe title="Prévia do site gerado" sandbox="allow-scripts" srcDoc={doc} /></div>
      <button className="botao primario largo" onClick={zip}><Icone nome="baixar" /> Baixar ZIP do site</button>
      <details className="cartao-plano"><summary className="forte pequeno">O que vem no ZIP</summary><ul className="passos pequeno" style={{ marginTop: 8 }}>{Object.entries(arquivos).map(([n, c]) => <li key={n}>{n} <span className="suave">({Math.max(1, Math.round(c.length / 1024))} KB)</span></li>)}</ul></details>
      <p className="dica">Para publicar: Netlify → Add new site → Deploy manually. O README dentro do ZIP explica cada passo.</p>
    </section>
  );
};

/* ------------------------------------------------------------------ modelos aprendidos */

type Proj = (typeof modelos.projetos)[number];
const catalogo = modelos.catalogoRecursos as Record<string, string>;

const Modelos: React.FC<{ aoUsar: (m: ModeloBase) => void }> = ({ aoUsar }) => {
  const param = ler<ParamPreco>('preco.param', PARAM_PADRAO);
  const comum = modelos.projetos.map((p) => p.recursos).reduce((a, b) => a.filter((x) => b.includes(x)));
  return (
    <>
      <section className="cartao pilha-p">
        <h2>O que a engenharia reversa descobriu</h2>
        <p className="pequeno">O app leu os três sites que já fizemos (páginas, seções, scripts, cores, fontes e configuração) e extraiu o que se repete. É isso que o criador de sites reaproveita.</p>
        <div className="secao-titulo" style={{ marginTop: 8 }}>Presente nos três</div>
        <div className="chips">{comum.map((r) => <span key={r} className="selo ok">{catalogo[r]}</span>)}</div>
        <div className="secao-titulo" style={{ marginTop: 8 }}>Esqueleto comum</div>
        <ul className="passos pequeno">
          <li>HTML, CSS e JavaScript puros, sem build: qualquer hospedagem estática serve.</li>
          <li>Três páginas-base: início, institucional e localização.</li>
          <li><code>config.js</code> com WhatsApp, telefone, horário e endereço: o site inteiro lê de lá.</li>
          <li>Atendimento sempre termina no WhatsApp de uma pessoa.</li>
          <li>Blocos repetidos (topo, rodapé, botões flutuantes) e <code>MAPA-DO-SITE.md</code> para facilitar alterações.</li>
        </ul>
        <p className="dica">Dados dos clientes (como chaves do banco) não são copiados: o app guarda só a estrutura.</p>
      </section>

      {modelos.projetos.map((p: Proj) => {
        const c = calcular(itensDeProjeto(p.recursos), param);
        return (
          <section key={p.projeto} className="cartao pilha-p">
            <div className="linha-entre"><h3>{NOMES_PROJETO[p.projeto] ?? p.projeto}</h3><span className="selo">{p.paginas.length} páginas</span></div>
            <div className="linha quebra mini suave">
              <span>{p.tamanho.linhasHtml.toLocaleString('pt-BR')} linhas HTML</span><span>·</span><span>{p.tamanho.linhasCss.toLocaleString('pt-BR')} CSS</span><span>·</span><span>{p.tamanho.linhasJs.toLocaleString('pt-BR')} JS</span><span>·</span><span>{p.modulosJs.length} módulos</span>
            </div>
            <div className="linha quebra">
              {p.identidade.cores.slice(0, 6).map((cor) => <span key={cor.nome} title={cor.nome} style={{ width: 26, height: 26, borderRadius: 8, background: cor.valor, boxShadow: 'inset 0 0 0 1px rgba(128,128,128,.4)' }} />)}
              <span className="mini suave">{p.identidade.fontes.slice(0, 3).join(' · ')}</span>
            </div>
            <div className="chips">{p.recursos.map((r) => <span key={r} className="selo">{catalogo[r]}</span>)}</div>
            <details className="cartao-plano"><summary className="forte pequeno">Seções da página inicial</summary><p className="pequeno suave" style={{ marginTop: 6 }}>{(p.secoes['index.html'] ?? []).join(' → ') || '—'}</p></details>
            <div className="linha-entre cartao-plano"><span className="pequeno">Se fosse feito hoje, pelo seu orçamento</span><span className="forte">{brl(c.total)}</span></div>
            <button className="botao" onClick={() => aoUsar(MODELO_DO_PROJETO[p.projeto])}>Criar um site neste modelo</button>
          </section>
        );
      })}
      <p className="dica">Modelos da análise de {modelos.geradoEm}. Para atualizar quando os sites mudarem, rode a análise de novo.</p>
    </>
  );
};

/* ------------------------------------------------------------------ orçamento */

const Orcamento: React.FC<{ spec: SiteSpec }> = ({ spec }) => {
  const toast = useToast();
  const [param, setParam] = useState<ParamPreco>(() => ({ ...PARAM_PADRAO, ...ler<Partial<ParamPreco>>('preco.param', {}) }));
  const [cliente, setCliente] = useState(spec.nome);
  const [sel, setSel] = useState<string[]>(() => itensDoSite(spec.recursos, spec.itens.length > 0));
  const [horasExtras, setHorasExtras] = useState(0);
  const [pacote, setPacote] = useState<string>('');
  const refCopia = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { gravar('preco.param', param); }, [param]);
  const num = (k: keyof ParamPreco) => (v: string) => setParam({ ...param, [k]: Math.max(0, Number(v.replace(',', '.')) || 0) });

  const calc = useMemo(() => calcular(sel, param, horasExtras), [sel, param, horasExtras]);
  const texto = useMemo(() => proposta({ cliente, calculo: calc, param, nomePacote: PACOTES.find((p) => p.id === pacote)?.nome }), [cliente, calc, param, pacote]);
  const alternar = (id: string) => { setPacote(''); setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])); };

  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); toast('Proposta copiada!'); } catch { refCopia.current?.select(); toast('Selecione e copie o texto abaixo.'); }
  };

  return (
    <>
      <section className="cartao pilha">
        <div className="secao-titulo">Sua tabela</div>
        <p className="dica">Valores iniciais são estimativas minhas. Ajuste ao seu mercado e ao seu ritmo: tudo se recalcula e fica salvo.</p>
        <div className="grade-2">
          <Campo rotulo="Valor da sua hora (R$)" valor={String(param.valorHora)} aoMudar={num('valorHora')} tipo="tel" />
          <Campo rotulo="Margem (%)" valor={String(param.margemPct)} aoMudar={num('margemPct')} tipo="tel" />
          <Campo rotulo="Domínio por ano (R$)" valor={String(param.dominioAno)} aoMudar={num('dominioAno')} tipo="tel" />
          <Campo rotulo="Manutenção por mês (R$)" valor={String(param.manutencaoMes)} aoMudar={num('manutencaoMes')} tipo="tel" />
          <Campo rotulo="Entrada (%)" valor={String(param.entradaPct)} aoMudar={num('entradaPct')} tipo="tel" />
          <Campo rotulo="Horas de trabalho por dia" valor={String(param.horasPorDia)} aoMudar={num('horasPorDia')} tipo="tel" />
        </div>
      </section>

      <section className="pilha">
        <h2>Pacotes prontos</h2>
        {PACOTES.map((p) => {
          const c = calcular(p.itens, param);
          return (
            <button key={p.id} className={`opcao ${pacote === p.id ? 'ativo' : ''}`} onClick={() => { setPacote(p.id); setSel(p.itens); }}>
              <div className="cresce"><div className="titulo">{p.nome}</div><div className="desc">{p.descricao}</div><div className="mini suave">{c.horas} h · {c.prazoDias} dias úteis</div></div>
              <span className="forte" style={{ fontSize: 18 }}>{brl(c.total)}</span>
            </button>
          );
        })}
      </section>

      <section className="cartao pilha-p">
        <div className="secao-titulo">Monte por item</div>
        {(['base', 'recurso', 'extra'] as const).map((g) => (
          <div key={g} className="pilha-p">
            <span className="mini suave forte" style={{ letterSpacing: '.08em', marginTop: 6 }}>{g === 'base' ? 'BASE DO SITE' : g === 'recurso' ? 'RECURSOS' : 'EXTRAS'}</span>
            {ITENS_PRECO.filter((i) => i.grupo === g).map((i) => (
              <label key={i.id} className="linha" style={{ padding: '4px 0' }}>
                <input type="checkbox" checked={sel.includes(i.id)} onChange={() => alternar(i.id)} style={{ width: 22, height: 22, accentColor: 'var(--primaria)' }} />
                <span className="cresce pequeno">{i.nome}</span><span className="mini suave">{i.horas} h</span>
              </label>
            ))}
          </div>
        ))}
        <Campo rotulo="Horas extras (ajustes especiais)" valor={String(horasExtras)} aoMudar={(v) => setHorasExtras(Math.max(0, Number(v) || 0))} tipo="tel" />
      </section>

      <section className="cartao pilha-p">
        <div className="secao-titulo">Conta</div>
        <div className="linha-entre pequeno"><span>{calc.horas} h × {brl(param.valorHora)}</span><span>{brl(calc.trabalho)}</span></div>
        <div className="linha-entre pequeno"><span>Margem ({param.margemPct}%)</span><span>{brl(calc.margem)}</span></div>
        <div className="linha-entre pequeno"><span>Domínio (1º ano)</span><span>{brl(calc.terceiros)}</span></div>
        <div className="linha-entre" style={{ borderTop: '1px solid var(--linha)', paddingTop: 10 }}><span className="forte">Total</span><span className="forte" style={{ fontSize: 28 }}>{brl(calc.total)}</span></div>
        <div className="linha-entre pequeno suave"><span>Entrada {param.entradaPct}% · restante na entrega</span><span>{brl(calc.entrada)} + {brl(calc.restante)}</span></div>
        <div className="linha-entre pequeno suave"><span>Prazo estimado</span><span>{calc.prazoDias} dias úteis</span></div>
        <div className="linha-entre pequeno suave"><span>Manutenção mensal (opcional)</span><span>{brl(calc.mensal)}/mês</span></div>
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo">Proposta para o cliente</div>
        <Campo rotulo="Nome do cliente" valor={cliente} aoMudar={setCliente} />
        <textarea ref={refCopia} className="entrada" rows={14} value={texto} readOnly style={{ fontSize: 14, minHeight: 280 }} />
        <div className="linha">
          <button className="botao primario cresce" onClick={copiar}><Icone nome="copiar" /> Copiar</button>
          <a className="botao cresce" href={`https://wa.me/?text=${encodeURIComponent(texto)}`} target="_blank" rel="noreferrer"><Icone nome="enviar" /> WhatsApp</a>
        </div>
        <p className="dica">O botão do WhatsApp abre a conversa para você escolher o contato. Nada é enviado sozinho.</p>
      </section>
    </>
  );
};
