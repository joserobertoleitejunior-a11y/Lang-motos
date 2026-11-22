import React, { useEffect, useMemo, useState } from 'react';
import { api, type Marca } from '../api';
import { FONTES_LOGO, SEGMENTOS_LOGO, PALETAS_LOGO, variacoes, type LogoSpec } from '../../../src/shared/logos';
import { baixar, svgCompleto, svgParaDataUrl, svgParaPng } from '../logoExport';
import { ler, gravar } from '../guardar';
import { Carregando, Chips, Girando, Icone, STANDALONE, Topo, useCarregar, useToast } from '../ui';

type Salvo = { id: string; spec: LogoSpec; em: string };

export const Logos: React.FC = () => {
  const toast = useToast();
  const marcas = useCarregar(() => api.get<Marca[]>('/api/marcas'));
  const [nome, setNome] = useState(() => ler('logo.nome', ''));
  const [slogan, setSlogan] = useState(() => ler('logo.slogan', ''));
  const [segmento, setSegmento] = useState(() => ler('logo.segmento', 'comercio'));
  const [marcaId, setMarcaId] = useState('');
  const [rodada, setRodada] = useState(0);
  const [escolhido, setEscolhido] = useState<LogoSpec | null>(null);
  const [imagens, setImagens] = useState<{ spec: LogoSpec; url: string }[]>([]);
  const [gerando, setGerando] = useState(false);
  const [salvos, setSalvos] = useState<Salvo[]>(() => ler('logo.salvos', []));
  const [ocupado, setOcupado] = useState(false);

  const marca = marcas.dados?.find((m) => m.id === marcaId);
  const lista = useMemo(() => (nome.trim() ? variacoes({ nome, slogan, segmento, cores: marca?.cores }, 8, rodada) : []), [nome, slogan, segmento, marca, rodada]);

  useEffect(() => { gravar('logo.nome', nome); gravar('logo.slogan', slogan); gravar('logo.segmento', segmento); }, [nome, slogan, segmento]);
  useEffect(() => {
    let vivo = true;
    if (!lista.length) { setImagens([]); return; }
    setGerando(true);
    Promise.all(lista.map(async (spec) => ({ spec, url: svgParaDataUrl((await svgCompleto(spec)).svg) })))
      .then((r) => { if (vivo) { setImagens(r); setEscolhido((e) => e ?? null); } })
      .catch((e) => toast((e as Error).message))
      .finally(() => vivo && setGerando(false));
    return () => { vivo = false; };
  }, [lista]); // eslint-disable-line react-hooks/exhaustive-deps

  const editar = (p: Partial<LogoSpec>) => escolhido && setEscolhido({ ...escolhido, ...p });
  const nomeArq = (nome.trim() || 'logo').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

  const exportar = async (tipo: 'svg' | 'png') => {
    if (!escolhido) return;
    setOcupado(true);
    try {
      const r = await svgCompleto(escolhido);
      if (tipo === 'svg') baixar(new Blob([r.svg], { type: 'image/svg+xml' }), `${nomeArq}.svg`);
      else baixar(await svgParaPng(r.svg, r.largura, r.altura), `${nomeArq}.png`);
      if (STANDALONE) toast('Neste link o download é bloqueado. No app publicado ele baixa direto.');
    } catch (e) { toast((e as Error).message); } finally { setOcupado(false); }
  };

  const usarNaMarca = async () => {
    if (!escolhido || !marcaId) { toast('Escolha uma marca primeiro.'); return; }
    setOcupado(true);
    try {
      const r = await svgCompleto({ ...escolhido, fundoTransparente: true });
      const png = await svgParaPng(r.svg, r.largura, r.altura, 1024);
      const form = new FormData();
      form.append('logo', png, 'logo.png');
      await api.formulario(`/api/marcas/${marcaId}/logo`, form);
      toast('Logo aplicado na marca! Ele já sai no final dos vídeos.');
      marcas.recarregar();
    } catch (e) { toast((e as Error).message); } finally { setOcupado(false); }
  };

  const guardar = () => {
    if (!escolhido) return;
    const novo = [{ id: Math.random().toString(36).slice(2, 8), spec: escolhido, em: new Date().toISOString() }, ...salvos].slice(0, 12);
    setSalvos(novo); gravar('logo.salvos', novo); toast('Logo guardado na sua lista.');
  };

  return (
    <div className="pilha">
      <Topo titulo="Logotipos" />
      <p className="suave pequeno">Digite o nome e veja 8 opções na hora. Toque numa para ajustar cores, fonte e formato, e depois baixe ou use na marca do cliente.</p>

      <section className="cartao pilha">
        <label className="campo"><span>Nome do negócio</span><input className="entrada" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Barbearia do Zé" /></label>
        <label className="campo"><span>Frase curta (opcional)</span><input className="entrada" value={slogan} onChange={(e) => setSlogan(e.target.value)} placeholder="Ex.: Corte e barba" maxLength={32} /></label>
        <label className="campo"><span>Ramo</span>
          <select className="entrada" value={segmento} onChange={(e) => setSegmento(e.target.value)}>{SEGMENTOS_LOGO.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}</select>
        </label>
        {marcas.dados && marcas.dados.length > 0 && (
          <label className="campo"><span>Usar as cores da marca (opcional)</span>
            <select className="entrada" value={marcaId} onChange={(e) => setMarcaId(e.target.value)}><option value="">Nenhuma</option>{marcas.dados.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select>
          </label>
        )}
      </section>

      {!nome.trim() && <div className="cartao vazio"><Icone nome="estrela" tam={30} /><p className="suave">Digite o nome para ver as opções.</p></div>}
      {nome.trim() && (
        <>
          <div className="linha-entre"><h2>Opções</h2><button className="botao pequeno" onClick={() => { setRodada((r) => r + 1); setEscolhido(null); }}><Icone nome="recarregar" tam={18} /> Mais opções</button></div>
          {gerando && !imagens.length && <Carregando texto="Desenhando…" />}
          <div className="grade-logos">
            {imagens.map((im, i) => (
              <button key={i} className={`logo-card ${escolhido && JSON.stringify(escolhido) === JSON.stringify(im.spec) ? 'ativo' : ''}`} onClick={() => setEscolhido(im.spec)} aria-label={`Escolher opção ${i + 1}`}>
                <img src={im.url} alt={`Opção ${i + 1} de logotipo`} />
              </button>
            ))}
          </div>
        </>
      )}

      {escolhido && (
        <section className="cartao pilha">
          <div className="secao-titulo">Ajustar</div>
          <div className="pilha-p"><span className="forte pequeno">Formato</span>
            <Chips opcoes={[{ v: 'emblema', t: 'Emblema' }, { v: 'horizontal', t: 'Horizontal' }, { v: 'monograma', t: 'Monograma' }, { v: 'nome', t: 'Só o nome' }]} valor={escolhido.estilo} aoMudar={(v) => editar({ estilo: v })} /></div>
          {escolhido.estilo !== 'nome' && <div className="pilha-p"><span className="forte pequeno">Moldura</span>
            <Chips opcoes={[{ v: 'circulo', t: 'Círculo' }, { v: 'escudo', t: 'Escudo' }, { v: 'hexagono', t: 'Hexágono' }, { v: 'quadrado', t: 'Quadrado' }]} valor={escolhido.forma} aoMudar={(v) => editar({ forma: v })} /></div>}
          <div className="pilha-p"><span className="forte pequeno">Fonte</span>
            <Chips opcoes={FONTES_LOGO.map((f) => ({ v: f.id, t: f.nome }))} valor={escolhido.fonte} aoMudar={(v) => editar({ fonte: v })} /></div>
          <div className="pilha-p"><span className="forte pequeno">Cores</span>
            <div className="chips">{[...(marca?.cores && marca.cores.length > 1 ? [{ fundo: '#FFFFFF', principal: marca.cores[0], detalhe: marca.cores[1] }] : []), ...PALETAS_LOGO].map((p, i) => (
              <button key={i} className={`chip ${JSON.stringify(escolhido.cores) === JSON.stringify(p) ? 'ativo' : ''}`} onClick={() => editar({ cores: p })} aria-label={`Paleta ${i + 1}`}>
                {[p.fundo, p.principal, p.detalhe].map((c) => <span key={c} style={{ width: 18, height: 18, borderRadius: 6, background: c, boxShadow: 'inset 0 0 0 1px rgba(128,128,128,.4)' }} />)}
              </button>))}</div></div>
          <label className="linha-entre"><span className="forte pequeno">Fundo transparente</span><input type="checkbox" checked={escolhido.fundoTransparente} onChange={(e) => editar({ fundoTransparente: e.target.checked })} style={{ width: 24, height: 24, accentColor: 'var(--primaria)' }} /></label>
          <PreviaAtual spec={escolhido} />
          <div className="linha quebra">
            <button className="botao primario cresce" disabled={ocupado} onClick={() => exportar('png')}>{ocupado ? <Girando /> : <Icone nome="baixar" />} PNG</button>
            <button className="botao cresce" disabled={ocupado} onClick={() => exportar('svg')}><Icone nome="baixar" /> SVG</button>
            <button className="botao cresce" onClick={guardar}><Icone nome="check" /> Guardar</button>
          </div>
          {marcas.dados && marcas.dados.length > 0 && <button className="botao contorno largo" disabled={ocupado || !marcaId} onClick={usarNaMarca}>{marcaId ? 'Usar como logo da marca' : 'Escolha uma marca acima para aplicar'}</button>}
        </section>
      )}

      {salvos.length > 0 && (
        <section className="cartao pilha-p">
          <div className="secao-titulo">Guardados</div>
          <div className="faixa">{salvos.map((s) => <SalvoMini key={s.id} s={s} aoEscolher={() => { setNome(s.spec.nome); setSlogan(s.spec.slogan); setEscolhido(s.spec); }} />)}</div>
        </section>
      )}
      <p className="dica">São logos vetoriais criados por modelos de desenho do app, sem IA. Quando a chave de imagens estiver conectada, o app também poderá criar logos por IA.</p>
    </div>
  );
};

const PreviaAtual: React.FC<{ spec: LogoSpec }> = ({ spec }) => {
  const [url, setUrl] = useState('');
  useEffect(() => { let v = true; svgCompleto(spec).then((r) => v && setUrl(svgParaDataUrl(r.svg))); return () => { v = false; }; }, [spec]);
  return <div className="logo-previa" style={{ background: spec.fundoTransparente ? 'repeating-conic-gradient(#8883 0 25%, transparent 0 50%) 50% / 20px 20px' : undefined }}>{url ? <img src={url} alt="Logo escolhido" /> : <Girando />}</div>;
};

const SalvoMini: React.FC<{ s: Salvo; aoEscolher: () => void }> = ({ s, aoEscolher }) => {
  const [url, setUrl] = useState('');
  useEffect(() => { let v = true; svgCompleto(s.spec).then((r) => v && setUrl(svgParaDataUrl(r.svg))); return () => { v = false; }; }, [s]);
  return <button className="logo-card mini" onClick={aoEscolher} aria-label="Abrir logo guardado">{url && <img src={url} alt="" />}</button>;
};
