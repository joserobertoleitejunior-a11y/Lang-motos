import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api, dolar, type Estado, type Marca, type Pedido, type Vozes, type VozConfig } from '../api';
import { prepararFoto } from '../imagens';
import { Chips, Girando, Icone, Interruptor, ir, Topo, useCarregar, useToast } from '../ui';

type Foto = { chave: string; arquivo: File; url: string; descricao: string };

const EXEMPLOS = [
  'Promoção de sexta na pizzaria: pizza grande por R$ 39,90 e entrega grátis no bairro. Tom alegre, público família.',
  'Lançamento da nova coleção de verão da loja de roupas. Peças leves e coloridas. Chamar para visitar a loja.',
  'Barbearia: mostrar o corte degradê e a barba na toalha quente. Agendamento pelo WhatsApp.',
];

const FORMATOS: { v: Pedido['formato']; t: string }[] = [
  { v: '9:16', t: 'Reels / TikTok' }, { v: '4:5', t: 'Feed' }, { v: '1:1', t: 'Quadrado' }, { v: '16:9', t: 'YouTube' },
];
const ESTILOS: { v: Pedido['estilo']; t: string }[] = [
  { v: 'auto', t: 'Automático' }, { v: 'fofo-3d', t: 'Fofo 3D' }, { v: 'moderno', t: 'Moderno' }, { v: 'impacto', t: 'Impacto' }, { v: 'elegante', t: 'Elegante' }, { v: 'minimalista', t: 'Minimalista' },
];
const MUSICAS: { v: Pedido['musica']; t: string }[] = [
  { v: 'auto', t: 'Automática' }, { v: 'alegre', t: 'Alegre' }, { v: 'tranquilo', t: 'Tranquila' }, { v: 'energetico', t: 'Energética' }, { v: 'elegante', t: 'Elegante' }, { v: 'nenhuma', t: 'Sem música' },
];
const QUALIDADES: { v: Pedido['qualidade']; t: string; d: string; custo: number }[] = [
  { v: 'economico', t: 'Econômico', d: 'Usa as suas fotos e o mascote. Sem imagens por IA.', custo: 0.15 },
  { v: 'padrao', t: 'Padrão', d: 'Até 4 imagens criadas ou editadas por IA.', custo: 0.4 },
  { v: 'cinema', t: 'Cinema', d: 'Até 6 imagens por IA e 2 cenas viram vídeo animado.', custo: 1.4 },
];

export const Novo: React.FC = () => {
  const toast = useToast();
  const estado = useCarregar(() => api.get<Estado>('/api/estado'));
  const marcas = useCarregar(() => api.get<Marca[]>('/api/marcas'));
  const vozes = useCarregar(() => api.get<Vozes>('/api/vozes'));
  const [briefing, setBriefing] = useState('');
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [marcaId, setMarcaId] = useState<string>('');
  const [formato, setFormato] = useState<Pedido['formato']>('9:16');
  const [duracao, setDuracao] = useState(20);
  const [narracao, setNarracao] = useState<'sim' | 'nao'>('sim');
  const [voz1, setVoz1] = useState<string>('');
  const [dialogo, setDialogo] = useState(false);
  const [voz2, setVoz2] = useState<string>('');
  const [estilo, setEstilo] = useState<Pedido['estilo']>('auto');
  const [musica, setMusica] = useState<Pedido['musica']>('auto');
  const [legendas, setLegendas] = useState<Pedido['legendas']>('auto');
  const [qualidade, setQualidade] = useState<Pedido['qualidade']>('padrao');
  const [revisar, setRevisar] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const entrada = useRef<HTMLInputElement>(null);

  const temVoz = !!estado.dados?.provedores.some((p) => (p.provedor === 'elevenlabs' || p.provedor === 'gemini') && p.configurada);
  const temClaude = !!estado.dados?.provedores.find((p) => p.provedor === 'anthropic')?.configurada;
  useEffect(() => { if (estado.dados && !temVoz) setNarracao('nao'); }, [estado.dados, temVoz]);
  useEffect(() => { if (marcas.dados?.length === 1) setMarcaId(marcas.dados[0].id); }, [marcas.dados]);
  useEffect(() => () => fotos.forEach((f) => URL.revokeObjectURL(f.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const opcoesVoz = useMemo(() => (vozes.dados?.salvas ?? []).map((v) => ({ id: v.id, rotulo: `${v.nome}${v.tipo === 'clone' ? ' (clonada)' : ''} · ${v.provedor === 'gemini' ? 'Google' : 'ElevenLabs'}`, cfg: { provedor: v.provedor, vozId: v.vozId, nome: v.nome } as VozConfig })), [vozes.dados]);

  const adicionarFotos = (lista: FileList | null) => {
    if (!lista) return;
    const novas = Array.from(lista).filter((f) => f.type.startsWith('image/')).slice(0, 10 - fotos.length).map((f) => ({ chave: Math.random().toString(36).slice(2), arquivo: f, url: URL.createObjectURL(f), descricao: '' }));
    setFotos((x) => [...x, ...novas]);
  };

  const criar = async () => {
    if (briefing.trim().length < 8) { toast('Escreva em uma frase o que você quer no vídeo.'); return; }
    setEnviando(true);
    try {
      const form = new FormData();
      const pedido = {
        briefing, formato, duracao, estilo, musica, legendas, narracao,
        vozPrincipal: opcoesVoz.find((o) => o.id === voz1)?.cfg ?? null,
        vozSecundaria: dialogo ? opcoesVoz.find((o) => o.id === voz2)?.cfg ?? null : null,
        marcaId: marcaId || null, qualidade, revisar,
      };
      form.append('pedido', JSON.stringify(pedido));
      form.append('descricoes', JSON.stringify(fotos.map((f) => f.descricao)));
      for (const f of fotos) {
        const blob = await prepararFoto(f.arquivo);
        form.append('fotos', blob, f.arquivo.name.replace(/\.\w+$/, blob.type === 'image/png' ? '.png' : '.jpg'));
      }
      const r = await api.formulario<{ id: string }>('/api/projetos', form);
      ir(`projeto/${r.id}`);
    } catch (e) {
      toast((e as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="pilha">
      <Topo titulo="Novo vídeo" voltar="inicio" />

      <section className="cartao pilha-p">
        <div className="secao-titulo"><span className="num">1</span>O que você quer no vídeo?</div>
        <textarea className="entrada" value={briefing} onChange={(e) => setBriefing(e.target.value)} placeholder="Ex.: Promoção de sexta na pizzaria: pizza grande por R$ 39,90…" rows={5} />
        <div className="faixa">
          {EXEMPLOS.map((e, i) => <button key={i} type="button" className="chip" onClick={() => setBriefing(e)}>Exemplo {i + 1}</button>)}
        </div>
        <p className="dica">Diga o produto/serviço, a oferta, o público e o tom. Preços e contatos só entram se você escrever.</p>
      </section>

      <section className="cartao pilha-p">
        <div className="secao-titulo"><span className="num">2</span>Fotos de referência <span className="suave mini">(opcional)</span></div>
        <div className="fotos">
          {fotos.map((f) => (
            <div key={f.chave} className="foto">
              <img src={f.url} alt="" />
              <button className="remover" aria-label="Remover foto" onClick={() => setFotos((x) => x.filter((y) => y.chave !== f.chave))}><Icone nome="x" tam={16} /></button>
            </div>
          ))}
          {fotos.length < 10 && (
            <button type="button" className="foto-add" onClick={() => entrada.current?.click()}><Icone nome="foto" tam={26} />Adicionar</button>
          )}
        </div>
        <input ref={entrada} type="file" accept="image/*" multiple hidden onChange={(e) => { adicionarFotos(e.target.files); e.target.value = ''; }} />
        {fotos.length > 0 && (
          <div className="pilha-p">
            {fotos.map((f, i) => (
              <input key={f.chave} className="entrada" value={f.descricao} placeholder={`O que é a foto ${i + 1}? (ex.: pizza calabresa)`} onChange={(e) => setFotos((x) => x.map((y) => (y.chave === f.chave ? { ...y, descricao: e.target.value } : y)))} />
            ))}
          </div>
        )}
        <p className="dica">Fotos do produto, da loja, do cardápio ou de pessoas (com autorização). A IA usa, recorta ou melhora conforme o roteiro.</p>
      </section>

      <section className="cartao pilha-p">
        <div className="secao-titulo"><span className="num">3</span>Marca</div>
        {marcas.dados && marcas.dados.length > 0 ? (
          <select className="entrada" value={marcaId} onChange={(e) => setMarcaId(e.target.value)}>
            <option value="">Sem marca</option>
            {marcas.dados.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
          </select>
        ) : <p className="pequeno suave">Nenhuma marca cadastrada ainda.</p>}
        <a href="#/marcas/nova" className="pequeno forte">+ Cadastrar marca (logo, cores e contatos)</a>
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">4</span>Formato e duração</div>
        <Chips opcoes={FORMATOS} valor={formato} aoMudar={setFormato} />
        <div className="pilha-p">
          <div className="linha-entre"><span className="forte pequeno">Duração</span><span className="selo">{duracao} segundos</span></div>
          <input type="range" min={10} max={60} step={5} value={duracao} onChange={(e) => setDuracao(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primaria)' }} />
        </div>
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">5</span>Narração</div>
        <Chips opcoes={[{ v: 'sim' as const, t: 'Com voz' }, { v: 'nao' as const, t: 'Sem voz (só texto)' }]} valor={narracao} aoMudar={setNarracao} />
        {narracao === 'sim' && !temVoz && <div className="aviso">Sem chave de voz configurada: o vídeo sai com legendas, mas sem áudio de narração. <a href="#/guia/vozes">Configurar</a></div>}
        {narracao === 'sim' && temVoz && (
          <div className="pilha-p">
            <select className="entrada" value={voz1} onChange={(e) => setVoz1(e.target.value)}>
              <option value="">Voz automática</option>
              {opcoesVoz.map((o) => <option key={o.id} value={o.id}>{o.rotulo}</option>)}
            </select>
            <label className="linha-entre"><span className="pequeno forte">Diálogo com uma segunda voz</span><Interruptor ligado={dialogo} aoMudar={setDialogo} rotulo="Diálogo" /></label>
            {dialogo && (
              <select className="entrada" value={voz2} onChange={(e) => setVoz2(e.target.value)}>
                <option value="">Escolha a segunda voz</option>
                {opcoesVoz.filter((o) => o.id !== voz1).map((o) => <option key={o.id} value={o.id}>{o.rotulo}</option>)}
              </select>
            )}
            <a href="#/vozes" className="pequeno forte">+ Clonar sua voz ou escolher novas vozes</a>
          </div>
        )}
        <div className="pilha-p">
          <span className="forte pequeno">Legendas</span>
          <Chips opcoes={[{ v: 'auto' as const, t: 'Automático' }, { v: 'sim' as const, t: 'Sim' }, { v: 'nao' as const, t: 'Não' }]} valor={legendas} aoMudar={setLegendas} />
        </div>
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">6</span>Estilo e música</div>
        <Chips opcoes={ESTILOS} valor={estilo} aoMudar={setEstilo} />
        <Chips opcoes={MUSICAS} valor={musica} aoMudar={setMusica} />
      </section>

      <section className="cartao pilha-p">
        <div className="secao-titulo"><span className="num">7</span>Qualidade</div>
        <div className="opcoes">
          {QUALIDADES.map((q) => (
            <button key={q.v} type="button" className={`opcao ${qualidade === q.v ? 'ativo' : ''}`} onClick={() => setQualidade(q.v)}>
              <div className="cresce"><div className="titulo">{q.t}</div><div className="desc">{q.d}</div></div>
              <span className="selo">≈ {dolar(q.custo)}</span>
            </button>
          ))}
        </div>
        <label className="linha-entre" style={{ marginTop: 6 }}>
          <span className="pilha-p" style={{ gap: 0 }}><span className="pequeno forte">Revisão automática</span><span className="dica">Um agente confere cada cena antes de entregar.</span></span>
          <Interruptor ligado={revisar} aoMudar={setRevisar} rotulo="Revisão automática" />
        </label>
        <p className="dica">Valores estimados por vídeo (podem variar). {estado.dados && `Limite por vídeo: ${dolar(estado.dados.limites.video)}.`}</p>
      </section>

      {!temClaude && estado.dados && <div className="aviso info"><Icone nome="info" /><span>Sem a chave do Claude, o roteiro é montado de forma simples (modo demonstração).</span></div>}
      <button className="botao primario grande largo" disabled={enviando} onClick={criar}>{enviando ? <><Girando /> Enviando…</> : <><Icone nome="raio" /> Criar vídeo</>}</button>
    </div>
  );
};
