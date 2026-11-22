import React, { useEffect, useRef, useState } from 'react';
import { api, dolar, type Projeto, type Versao } from '../api';
import { prepararFoto } from '../imagens';
import { PlayerVideo } from '../PlayerVideo';
import { Carregando, Girando, Icone, ir, Topo, useToast } from '../ui';
import { STATUS } from './Inicio';

const SUGESTOES = ['Deixe mais curto', 'Troque a música por algo mais animado', 'Mude as cores para azul', 'Coloque o preço maior', 'Deixe a abertura mais impactante'];

export const ProjetoTela: React.FC<{ id: string }> = ({ id }) => {
  const toast = useToast();
  const [p, setP] = useState<Projeto | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState('');
  const [fotosMsg, setFotosMsg] = useState<File[]>([]);
  const [enviando, setEnviando] = useState(false);
  const entrada = useRef<HTMLInputElement>(null);

  const carregar = () => api.get<Projeto>(`/api/projetos/${id}`).then((d) => { setP(d); setErro(null); }).catch((e) => setErro((e as Error).message));
  useEffect(() => { carregar(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!p || (p.status !== 'gerando' && p.status !== 'renderizando')) return;
    const t = window.setInterval(carregar, 2500);
    return () => window.clearInterval(t);
  }, [p?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  if (erro && !p) return <div className="pilha"><Topo titulo="Projeto" voltar="inicio" /><div className="aviso erro">{erro}</div></div>;
  if (!p) return <Carregando />;

  const versao: Versao | undefined = p.versoes.find((v) => v.n === p.versaoAtual);
  const spec = versao?.spec ?? null;
  const ocupado = p.status === 'gerando' || p.status === 'renderizando';
  const custoTotal = p.versoes.reduce((a, v) => a + v.custos.reduce((b, c) => b + c.usd, 0), 0);
  const legenda = versao ? `${versao.roteiro.legendaPost}\n\n${versao.roteiro.hashtags.join(' ')}`.trim() : '';

  const enviarMensagem = async (texto: string) => {
    if (texto.trim().length < 2) return;
    setEnviando(true);
    try {
      const form = new FormData();
      form.append('texto', texto);
      for (const f of fotosMsg) form.append('fotos', await prepararFoto(f), f.name);
      await api.formulario(`/api/projetos/${id}/mensagens`, form);
      setMensagem('');
      setFotosMsg([]);
      await carregar();
    } catch (e) {
      toast((e as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  const compartilhar = async () => {
    if (!versao?.video) return;
    try {
      const blob = await fetch(versao.video).then((r) => r.blob());
      const arquivo = new File([blob], `${p.titulo.replace(/[^\p{L}\p{N} ]/gu, '').slice(0, 40) || 'video'}.mp4`, { type: 'video/mp4' });
      if (navigator.canShare?.({ files: [arquivo] })) {
        await navigator.share({ files: [arquivo], text: legenda });
        return;
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
    }
    location.href = `${versao.video}?baixar=1`;
  };

  const copiar = async (t: string) => {
    try { await navigator.clipboard.writeText(t); toast('Copiado!'); } catch { toast('Não consegui copiar.'); }
  };

  const acao = async (url: string, msg: string) => {
    try { await api.enviar(url); toast(msg); await carregar(); } catch (e) { toast((e as Error).message); }
  };

  return (
    <div className="pilha">
      <Topo titulo={p.titulo} voltar="inicio" direita={
        <button className="icone-botao" aria-label="Apagar projeto" onClick={async () => { if (confirm('Apagar este projeto e todos os arquivos dele?')) { await api.apagar(`/api/projetos/${id}`); ir('inicio'); } }}><Icone nome="lixo" tam={20} /></button>
      } />

      <div className="linha quebra">
        <span className={`selo ${STATUS[p.status].c}`}>{ocupado && <Girando tam={13} />}{STATUS[p.status].t}</span>
        {spec && <span className="selo">{Math.round(spec.duracaoTotal / spec.fps)} s · {p.pedido.formato}</span>}
        {custoTotal > 0 && <span className="selo">{dolar(custoTotal)}</span>}
      </div>

      {p.status === 'erro' && (
        <div className="aviso erro pilha-p">
          <span>{p.erro ?? 'Algo deu errado.'}</span>
          <button className="botao pequeno" onClick={() => acao(`/api/projetos/${id}/retomar`, 'Tentando de novo…')}><Icone nome="recarregar" tam={18} /> Tentar de novo</button>
        </div>
      )}

      {spec ? (
        <div className="pilha">
          <PlayerVideo spec={spec} maxAltura={560} />
          {versao?.video ? (
            <div className="linha">
              <a className="botao primario cresce" href={`${versao.video}?baixar=1`}><Icone nome="baixar" /> Baixar MP4</a>
              <button className="botao cresce" onClick={compartilhar}><Icone nome="compartilhar" /> Compartilhar</button>
            </div>
          ) : p.status === 'renderizando' ? (
            <div className="cartao-plano linha"><Girando /><span className="pequeno">Gerando o arquivo MP4 em alta qualidade… {p.etapas.find((e) => e.id === 'render')?.detalhe ?? ''}</span></div>
          ) : !ocupado && (
            <button className="botao primario largo" onClick={() => acao(`/api/projetos/${id}/renderizar`, 'Gerando o MP4…')}><Icone nome="video" /> Gerar MP4</button>
          )}
        </div>
      ) : null}

      {(ocupado || !spec) && (
        <div className="cartao">
          <div className="secao-titulo">{ocupado ? 'A equipe de IAs está trabalhando' : 'Etapas'}</div>
          <div className="etapas">
            {p.etapas.map((e) => (
              <div key={e.id} className={`etapa ${e.status}`}>
                <span className="marca">{e.status === 'ok' ? <Icone nome="check" tam={16} traco={2.8} /> : e.status === 'rodando' ? <Girando tam={15} /> : e.status === 'erro' ? <Icone nome="x" tam={15} traco={2.8} /> : e.status === 'pulada' ? '–' : '•'}</span>
                <div className="pilha-p" style={{ gap: 0 }}>
                  <span className="nome">{e.nome}</span>
                  {e.detalhe && <span className="det">{e.detalhe}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="cartao pilha">
        <div className="secao-titulo"><Icone nome="estrela" tam={18} /> Conversa com o Diretor</div>
        <div className="chat">
          {p.mensagens.map((m, i) => <div key={i} className={`msg ${m.de}`}>{m.texto}</div>)}
        </div>
        {!ocupado && spec && (
          <>
            <div className="faixa">{SUGESTOES.map((s) => <button key={s} className="chip" onClick={() => setMensagem(s)}>{s}</button>)}</div>
            {fotosMsg.length > 0 && <p className="dica">{fotosMsg.length} foto(s) anexada(s) <button className="chip" onClick={() => setFotosMsg([])}>remover</button></p>}
            <div className="compositor">
              <button className="icone-botao" style={{ height: 50, width: 50 }} aria-label="Anexar foto" onClick={() => entrada.current?.click()}><Icone nome="foto" /></button>
              <textarea className="entrada cresce" rows={1} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Peça uma alteração…" />
              <button className="botao primario" style={{ width: 54, padding: 0 }} aria-label="Enviar" disabled={enviando || mensagem.trim().length < 2} onClick={() => enviarMensagem(mensagem)}>{enviando ? <Girando /> : <Icone nome="enviar" />}</button>
            </div>
            <input ref={entrada} type="file" accept="image/*" multiple hidden onChange={(e) => { setFotosMsg(Array.from(e.target.files ?? []).slice(0, 4)); e.target.value = ''; }} />
          </>
        )}
      </section>

      {versao && (
        <section className="cartao pilha-p">
          <div className="linha-entre"><div className="secao-titulo" style={{ margin: 0 }}>Legenda do post</div><button className="botao pequeno" onClick={() => copiar(legenda)}><Icone nome="copiar" tam={18} /> Copiar</button></div>
          <p className="pequeno" style={{ whiteSpace: 'pre-wrap' }}>{legenda}</p>
        </section>
      )}

      {p.versoes.length > 1 && (
        <section className="cartao pilha-p">
          <div className="secao-titulo">Versões</div>
          <div className="faixa">
            {p.versoes.map((v) => (
              <button key={v.n} className={`chip ${v.n === p.versaoAtual ? 'ativo' : ''}`} disabled={!v.spec || ocupado} onClick={() => acao(`/api/projetos/${id}/versoes/${v.n}/ativar`, `Versão ${v.n} ativada`)}>
                v{v.n}{v.origem === 'chat' ? ' · ajuste' : ''}
              </button>
            ))}
          </div>
          {versao?.pedidoChat && <p className="dica">Pedido desta versão: “{versao.pedidoChat}”</p>}
        </section>
      )}

      {versao && (
        <details className="cartao">
          <summary>Roteiro ({versao.roteiro.cenas.length} cenas) <span className="seta"><Icone nome="seta" /></span></summary>
          <div style={{ marginTop: 8 }}>
            {versao.roteiro.cenas.map((c, i) => (
              <div key={i} className="cena-item pilha-p" style={{ gap: 2 }}>
                <span className="mini suave forte">CENA {i + 1} · {c.layout.toUpperCase()}</span>
                {c.titulo && <span className="forte">{c.titulo}</span>}
                {c.narracao && <span className="pequeno suave">🎙 {c.narracao}</span>}
              </div>
            ))}
          </div>
        </details>
      )}

      {custoTotal > 0 && (
        <details className="cartao">
          <summary>Custos ({dolar(custoTotal)}) <span className="seta"><Icone nome="seta" /></span></summary>
          <div className="pilha-p" style={{ marginTop: 10 }}>
            {p.versoes.flatMap((v) => v.custos.map((c, i) => (
              <div key={`${v.n}-${i}`} className="linha-entre pequeno"><span className="cresce">v{v.n} · {c.descricao}</span><span className="forte">{dolar(c.usd)}</span></div>
            )))}
            <p className="dica">Valores estimados a partir dos preços públicos de cada serviço.</p>
          </div>
        </details>
      )}

      {p.referencias.length > 0 && (
        <details className="cartao">
          <summary>Fotos enviadas ({p.referencias.length}) <span className="seta"><Icone nome="seta" /></span></summary>
          <div className="fotos" style={{ marginTop: 10 }}>
            {p.referencias.map((r) => <div key={r.id} className="foto"><img src={r.url} alt={r.descricao ?? r.id} loading="lazy" /></div>)}
          </div>
        </details>
      )}
    </div>
  );
};
