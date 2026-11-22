import React, { useEffect, useRef, useState } from 'react';
import { api, type Ajustes, type Estado, type VozBiblioteca, type Vozes as TVozes } from '../api';
import { Carregando, Girando, Icone, ir, Topo, useCarregar, useToast } from '../ui';

const TEXTO_LEITURA = `Oi! Eu estou gravando a minha voz para criar vídeos para o meu negócio. Aqui a gente trabalha com carinho, atende cada cliente pelo nome e capricha em cada detalhe. Quer saber das novidades da semana? Tem promoção fresquinha, produto novo chegando e aquele atendimento que você já conhece. Passa aqui, chama no WhatsApp ou segue a gente no Instagram! Segunda a sábado, das oito da manhã às sete da noite. Vai ser um prazer te receber. Obrigado, e até já!`;

function tocar(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = new Audio(url);
  a.onended = () => URL.revokeObjectURL(url);
  a.play().catch(() => {});
}

export const Vozes: React.FC<{ sub?: string }> = ({ sub }) => (sub === 'clonar' ? <Clonar /> : <ListaVozes />);

const ListaVozes: React.FC = () => {
  const toast = useToast();
  const vozes = useCarregar(() => api.get<TVozes>('/api/vozes'));
  const estado = useCarregar(() => api.get<Estado>('/api/estado'));
  const [testando, setTestando] = useState<string | null>(null);
  const [filtro, setFiltro] = useState('');

  const testar = async (provedor: string, vozId: string) => {
    setTestando(vozId);
    try { tocar(await api.audio('/api/vozes/testar', { provedor, vozId })); } catch (e) { toast((e as Error).message); } finally { setTestando(null); }
  };
  const usar = async (provedor: 'elevenlabs' | 'gemini', v: VozBiblioteca) => {
    try { await api.enviar('/api/vozes', { provedor, vozId: v.vozId, nome: v.nome }); toast(`${v.nome} adicionada às suas vozes`); vozes.recarregar(); } catch (e) { toast((e as Error).message); }
  };
  const padrao = async (id: string) => {
    try { await api.enviar<Ajustes>('/api/ajustes', { vozPadrao: id }, 'PUT'); toast('Voz padrão definida'); estado.recarregar(); } catch (e) { toast((e as Error).message); }
  };
  const remover = async (id: string, clone: boolean) => {
    const remoto = clone && confirm('Apagar também da sua conta ElevenLabs? (OK = apagar lá também)');
    await api.apagar(`/api/vozes/${id}${remoto ? '?remoto=1' : ''}`);
    vozes.recarregar();
  };

  if (vozes.carregando && !vozes.dados) return <Carregando />;
  const d = vozes.dados;
  const vozPadrao = estado.dados?.ajustes.vozPadrao;
  const lista = (d?.elevenlabs ?? []).filter((v) => !filtro || `${v.nome} ${v.descricao}`.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div className="pilha">
      <Topo titulo="Vozes" />
      <a className="heroi" href="#/vozes/clonar" style={{ background: 'radial-gradient(120% 120% at 100% 0%, #ff7a2f 0%, transparent 45%), linear-gradient(135deg, #1f9d55, #0f766e)' }}>
        <h2>Clonar a sua voz</h2>
        <p>Grave cerca de 1 minuto lendo um texto e use a sua voz (ou a da sua esposa, com autorização dela) em todos os vídeos.</p>
        <span className="botao" style={{ color: '#0f766e' }}><Icone nome="micro" /> Gravar agora</span>
      </a>

      {!d?.elevenlabs && !d?.gemini && <div className="aviso info"><Icone nome="info" /><span>Para vozes e clonagem, conecte a <b>ElevenLabs</b> (recomendado) ou o <b>Google Gemini</b>. <a href="#/guia/vozes">Ver como</a></span></div>}
      {d?.erro && <div className="aviso erro">{d.erro}</div>}

      <section className="cartao pilha-p">
        <div className="secao-titulo">Suas vozes</div>
        {d?.salvas.length === 0 && <p className="suave pequeno">Nenhuma ainda. Clone a sua voz ou escolha vozes abaixo.</p>}
        {d?.salvas.map((v) => (
          <div key={v.id} className="cartao-plano linha">
            <button className="icone-botao" aria-label="Ouvir" onClick={() => testar(v.provedor, v.vozId)}>{testando === v.vozId ? <Girando /> : <Icone nome="play" tam={18} />}</button>
            <div className="cresce">
              <div className="forte">{v.nome} {vozPadrao === v.id && <span className="selo ok">padrão</span>}</div>
              <div className="mini suave">{v.tipo === 'clone' ? 'Voz clonada' : 'Biblioteca'} · {v.provedor === 'gemini' ? 'Google' : 'ElevenLabs'}</div>
            </div>
            {vozPadrao !== v.id && <button className="botao pequeno" onClick={() => padrao(v.id)}>Padrão</button>}
            <button className="icone-botao" aria-label="Remover" onClick={() => remover(v.id, v.tipo === 'clone')}><Icone nome="lixo" tam={18} /></button>
          </div>
        ))}
      </section>

      {d?.elevenlabs && (
        <section className="cartao pilha-p">
          <div className="secao-titulo">Biblioteca ElevenLabs</div>
          <input className="entrada" value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Buscar (ex.: feminina, brasileira, calma)" />
          {lista.slice(0, 40).map((v) => (
            <div key={v.vozId} className="linha" style={{ padding: '6px 0' }}>
              <button className="icone-botao" aria-label="Ouvir" onClick={() => (v.previa ? new Audio(v.previa).play().catch(() => {}) : testar('elevenlabs', v.vozId))}><Icone nome="play" tam={18} /></button>
              <div className="cresce"><div className="forte pequeno">{v.nome}</div><div className="mini suave">{v.descricao || v.categoria}</div></div>
              <button className="botao pequeno" onClick={() => usar('elevenlabs', v)}>Usar</button>
            </div>
          ))}
          <p className="dica">A prévia da biblioteca pode estar em inglês; o vídeo sai em português.</p>
        </section>
      )}

      {d?.gemini && (
        <section className="cartao pilha-p">
          <div className="secao-titulo">Vozes Google Gemini (econômicas)</div>
          {d.gemini.map((v) => (
            <div key={v.vozId} className="linha" style={{ padding: '6px 0' }}>
              <button className="icone-botao" aria-label="Ouvir" onClick={() => testar('gemini', v.vozId)}>{testando === v.vozId ? <Girando /> : <Icone nome="play" tam={18} />}</button>
              <div className="cresce"><div className="forte pequeno">{v.nome}</div><div className="mini suave">{v.descricao}</div></div>
              <button className="botao pequeno" onClick={() => usar('gemini', v)}>Usar</button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

const Clonar: React.FC = () => {
  const toast = useToast();
  const [gravando, setGravando] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [gravacoes, setGravacoes] = useState<{ blob: Blob; nome: string; seg: number }[]>([]);
  const [nome, setNome] = useState('Minha voz');
  const [declarante, setDeclarante] = useState('');
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const rec = useRef<MediaRecorder | null>(null);
  const pedacos = useRef<Blob[]>([]);
  const relogio = useRef<number>(0);
  const arquivoRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { window.clearInterval(relogio.current); rec.current?.stream.getTracks().forEach((t) => t.stop()); }, []);
  const total = gravacoes.reduce((a, g) => a + g.seg, 0);

  const iniciar = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const tipo = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find((t) => MediaRecorder.isTypeSupported(t));
      const r = new MediaRecorder(stream, tipo ? { mimeType: tipo } : undefined);
      pedacos.current = [];
      r.ondataavailable = (e) => e.data.size && pedacos.current.push(e.data);
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(pedacos.current, { type: r.mimeType || 'audio/webm' });
        const seg = Math.round((Date.now() - inicio) / 1000);
        setGravacoes((g) => [...g, { blob, nome: `gravacao-${g.length + 1}.${blob.type.includes('mp4') ? 'm4a' : 'webm'}`, seg }]);
      };
      const inicio = Date.now();
      r.start(1000);
      rec.current = r;
      setGravando(true);
      setSegundos(0);
      relogio.current = window.setInterval(() => setSegundos(Math.round((Date.now() - inicio) / 1000)), 500);
    } catch {
      toast('Não consegui acessar o microfone. Permita o microfone para este site.');
    }
  };
  const parar = () => {
    rec.current?.stop();
    window.clearInterval(relogio.current);
    setGravando(false);
  };

  const enviar = async () => {
    if (!consentimento) { toast('Confirme a autorização para clonar a voz.'); return; }
    if (!declarante.trim()) { toast('Informe o nome de quem autoriza.'); return; }
    if (!gravacoes.length) { toast('Grave ou envie o áudio primeiro.'); return; }
    setEnviando(true);
    try {
      const form = new FormData();
      form.append('nome', nome);
      form.append('declarante', declarante);
      form.append('consentimento', 'sim');
      gravacoes.forEach((g) => form.append('arquivos', g.blob, g.nome));
      await api.formulario('/api/vozes/clonar', form);
      toast('Voz clonada! Já pode usar nos vídeos.');
      ir('vozes');
    } catch (e) { toast((e as Error).message); } finally { setEnviando(false); }
  };

  return (
    <div className="pilha">
      <Topo titulo="Clonar voz" voltar="vozes" />
      <div className="aviso info"><Icone nome="info" /><span>Só clone a sua voz ou a de quem autorizou por escrito. A clonagem é feita pela ElevenLabs (plano Starter ou superior).</span></div>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">1</span>Leia este texto em voz alta</div>
        <div className="texto-leitura">{TEXTO_LEITURA}</div>
        <p className="dica">Lugar silencioso, celular a um palmo da boca, fale com naturalidade. O ideal é somar de 1 a 2 minutos (pode ler duas vezes).</p>
        <div className="gravador">
          <button className={`botao-gravar ${gravando ? 'gravando' : ''}`} onClick={gravando ? parar : iniciar} aria-label={gravando ? 'Parar' : 'Gravar'}>
            <Icone nome={gravando ? 'pausa' : 'micro'} tam={34} />
          </button>
          <span className="forte">{gravando ? `Gravando… ${segundos}s` : total ? `${total}s gravados` : 'Toque para gravar'}</span>
          {gravacoes.map((g, i) => (
            <div key={i} className="linha pequeno">
              <button className="icone-botao" onClick={() => tocar(g.blob)} aria-label="Ouvir"><Icone nome="play" tam={16} /></button>
              <span className="cresce">Gravação {i + 1} · {g.seg}s</span>
              <button className="icone-botao" onClick={() => setGravacoes((x) => x.filter((_, j) => j !== i))} aria-label="Apagar"><Icone nome="lixo" tam={16} /></button>
            </div>
          ))}
          <button className="botao pequeno contorno" onClick={() => arquivoRef.current?.click()}>Ou enviar arquivo de áudio</button>
          <input ref={arquivoRef} type="file" accept="audio/*,video/mp4" multiple hidden onChange={(e) => {
            const fs = Array.from(e.target.files ?? []);
            setGravacoes((g) => [...g, ...fs.map((f) => ({ blob: f as Blob, nome: f.name, seg: 0 }))]);
            e.target.value = '';
          }} />
        </div>
        {total > 0 && total < 30 && <div className="aviso">Grave pelo menos 30 segundos para um bom resultado (ideal: 60 a 120 s).</div>}
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo"><span className="num">2</span>Autorização</div>
        <label className="campo"><span>Nome da voz no app</span><input className="entrada" value={nome} onChange={(e) => setNome(e.target.value)} /></label>
        <label className="campo"><span>Quem é o dono da voz (nome completo)</span><input className="entrada" value={declarante} onChange={(e) => setDeclarante(e.target.value)} placeholder="Ex.: José Roberto" /></label>
        <label className="linha" style={{ alignItems: 'flex-start' }}>
          <input type="checkbox" checked={consentimento} onChange={(e) => setConsentimento(e.target.checked)} style={{ width: 22, height: 22, marginTop: 2, accentColor: 'var(--primaria)' }} />
          <span className="pequeno">Confirmo que esta voz é minha, ou que a pessoa dona da voz autorizou expressamente o uso para criar vídeos.</span>
        </label>
      </section>

      <button className="botao primario grande largo" disabled={enviando || gravando} onClick={enviar}>{enviando ? <><Girando /> Clonando…</> : <><Icone nome="onda" /> Criar voz clonada</>}</button>
    </div>
  );
};
