import React, { useState } from 'react';
import { api, dolar, type Ajustes, type Estado, type StatusChave } from '../api';
import { Carregando, Chips, Girando, Icone, Interruptor, Topo, useCarregar, useToast } from '../ui';

const NOMES_PROVEDOR: Record<string, string> = { anthropic: 'Claude', elevenlabs: 'ElevenLabs', openai: 'OpenAI', gemini: 'Google Gemini', fal: 'fal.ai' };

export const AjustesTela: React.FC<{ aoSair: () => void }> = ({ aoSair }) => {
  const toast = useToast();
  const estado = useCarregar(() => api.get<Estado>('/api/estado'));
  if (estado.carregando && !estado.dados) return <Carregando />;
  const e = estado.dados;
  if (!e) return <div className="aviso erro">{estado.erro}</div>;

  const salvar = async (a: Partial<Ajustes>) => {
    try { await api.enviar('/api/ajustes', a, 'PUT'); estado.recarregar(); toast('Salvo'); } catch (er) { toast((er as Error).message); }
  };

  return (
    <div className="pilha">
      <Topo titulo="Ajustes" />

      <section className="cartao pilha-p">
        <div className="secao-titulo">Atalhos</div>
        <a className="botao largo" href="#/marcas"><Icone nome="marca" /> Marcas (clientes)</a>
        <a className="botao largo" href="#/vozes"><Icone nome="micro" /> Vozes e clonagem</a>
      </section>

      <section className="cartao pilha-p">
        <div className="linha-entre"><div className="secao-titulo" style={{ margin: 0 }}><Icone nome="chave" tam={18} /> Chaves das IAs</div><a href="#/guia" className="pequeno forte">Como conseguir</a></div>
        <p className="dica">Cada IA é um serviço contratado por uso. A chave fica guardada só no servidor e nunca aparece de novo inteira.</p>
        {e.provedores.map((p) => <LinhaChave key={p.provedor} p={p} cofre={e.cofre} aoMudar={estado.recarregar} />)}
        {!e.cofre && <div className="aviso"><Icone nome="info" /><span>Para colar chaves aqui pelo app, defina <b>SEGREDO_CHAVES</b> na hospedagem. Ou coloque cada chave direto nas variáveis da hospedagem.</span></div>}
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo">Preferências</div>
        <div className="pilha-p">
          <span className="forte pequeno">Imagens por IA</span>
          <Chips opcoes={[{ v: 'auto', t: 'Automático' }, { v: 'openai', t: 'OpenAI' }, { v: 'gemini', t: 'Google' }, { v: 'nenhum', t: 'Nenhuma' }]} valor={e.ajustes.provedorImagem} aoMudar={(v) => salvar({ provedorImagem: v })} />
        </div>
        <div className="pilha-p">
          <span className="forte pequeno">Voz</span>
          <Chips opcoes={[{ v: 'auto', t: 'Automático' }, { v: 'elevenlabs', t: 'ElevenLabs' }, { v: 'gemini', t: 'Google' }, { v: 'nenhum', t: 'Sem voz' }]} valor={e.ajustes.provedorVoz} aoMudar={(v) => salvar({ provedorVoz: v })} />
        </div>
        <label className="campo">
          <span>Modelo de voz da ElevenLabs</span>
          <select className="entrada" value={e.ajustes.modeloVozElevenlabs} onChange={(x) => salvar({ modeloVozElevenlabs: x.target.value })}>
            <option value="eleven_multilingual_v2">Multilingual v2 — o mais estável</option>
            <option value="eleven_v3">v3 — mais expressivo</option>
            <option value="eleven_v4">v4 — o mais novo</option>
            <option value="eleven_flash_v2_5">Flash 2.5 — metade do preço</option>
          </select>
        </label>
        <div className="pilha-p">
          <span className="forte pequeno">Qualidade das imagens (OpenAI)</span>
          <Chips opcoes={[{ v: 'low', t: 'Rascunho' }, { v: 'medium', t: 'Média' }, { v: 'high', t: 'Alta' }]} valor={e.ajustes.qualidadeImagem} aoMudar={(v) => salvar({ qualidadeImagem: v })} />
        </div>
        <label className="linha-entre">
          <span className="pilha-p" style={{ gap: 0 }}><span className="forte pequeno">Música exclusiva por IA</span><span className="dica">Compõe uma trilha nova a cada vídeo (ElevenLabs, plano pago).</span></span>
          <Interruptor ligado={e.ajustes.musicaIA} aoMudar={(v) => salvar({ musicaIA: v })} rotulo="Música por IA" />
        </label>
      </section>

      <section className="cartao pilha-p">
        <div className="secao-titulo">Gastos estimados do mês</div>
        <div className="linha-entre"><span className="suave">Total</span><span className="forte" style={{ fontSize: 22 }}>{dolar(e.custoMes.total)}</span></div>
        {Object.entries(e.custoMes.porProvedor).map(([k, v]) => <div key={k} className="linha-entre pequeno"><span>{NOMES_PROVEDOR[k] ?? k}</span><span>{dolar(v)}</span></div>)}
        <p className="dica">Limites: {dolar(e.limites.video)} por vídeo e {dolar(e.limites.mes)} por mês (mude em LIMITE_CUSTO_VIDEO_USD e LIMITE_CUSTO_MES_USD na hospedagem). Configure também um limite de gasto no painel de cada serviço.</p>
        <p className="dica">Roteirista: {e.modeloClaude}</p>
      </section>

      <a className="botao contorno largo" href="#/guia"><Icone nome="livro" /> Guia: como tudo funciona</a>
      <button className="botao perigo largo" onClick={async () => { await api.enviar('/api/logout'); aoSair(); }}><Icone nome="sair" /> Sair</button>
    </div>
  );
};

const LinhaChave: React.FC<{ p: StatusChave; cofre: boolean; aoMudar: () => void }> = ({ p, cofre, aoMudar }) => {
  const toast = useToast();
  const [editando, setEditando] = useState(false);
  const [valor, setValor] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const testar = async () => {
    setOcupado(true);
    try { const r = await api.enviar<{ ok: boolean; mensagem: string }>(`/api/chaves/${p.provedor}/testar`); toast(r.mensagem); } catch (e) { toast((e as Error).message); } finally { setOcupado(false); }
  };
  const salvar = async () => {
    setOcupado(true);
    try { await api.enviar(`/api/chaves/${p.provedor}`, { valor }, 'PUT'); setValor(''); setEditando(false); toast('Chave guardada'); aoMudar(); } catch (e) { toast((e as Error).message); } finally { setOcupado(false); }
  };
  return (
    <div className="cartao-plano pilha-p">
      <div className="linha-entre">
        <div className="cresce">
          <div className="forte">{p.nome}</div>
          <div className="mini suave">{p.funcao}</div>
        </div>
        <span className={`selo ${p.configurada ? 'ok' : ''}`}>{p.configurada ? `•••• ${p.final ?? ''}` : 'Não conectada'}</span>
      </div>
      {p.configurada && p.origem === 'hospedagem' && <span className="mini suave">Definida na hospedagem</span>}
      <div className="linha quebra">
        {p.configurada && <button className="botao pequeno" disabled={ocupado} onClick={testar}>{ocupado ? <Girando tam={14} /> : <Icone nome="check" tam={16} />} Testar</button>}
        {cofre && p.origem !== 'hospedagem' && <button className="botao pequeno" onClick={() => setEditando((x) => !x)}><Icone nome="chave" tam={16} /> {p.configurada ? 'Trocar' : 'Colar chave'}</button>}
        {p.origem === 'app' && <button className="botao pequeno perigo" onClick={async () => { if (confirm(`Remover a chave da ${p.nome}?`)) { await api.apagar(`/api/chaves/${p.provedor}`); aoMudar(); } }}>Remover</button>}
      </div>
      {editando && (
        <div className="linha">
          <input className="entrada cresce" type="password" autoComplete="off" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Cole a chave aqui" />
          <button className="botao primario" disabled={ocupado || valor.length < 12} onClick={salvar}>Salvar</button>
        </div>
      )}
    </div>
  );
};
