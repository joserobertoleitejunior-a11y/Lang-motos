import React, { useEffect, useState } from 'react';
import { api, dataCurta, dolar, type Estado, type ResumoProjeto, type VideoSpec } from '../api';
import { PlayerVideo } from '../PlayerVideo';
import { Carregando, Girando, Icone, useCarregar } from '../ui';

export const STATUS: Record<ResumoProjeto['status'], { t: string; c: string }> = {
  gerando: { t: 'Criando…', c: 'rodando' },
  renderizando: { t: 'Finalizando…', c: 'rodando' },
  pronto: { t: 'Pronto', c: 'ok' },
  erro: { t: 'Com erro', c: 'erro' },
};

export const Inicio: React.FC<{ demo: boolean }> = ({ demo }) => {
  const estado = useCarregar(() => api.get<Estado>('/api/estado'));
  const projetos = useCarregar(() => api.get<ResumoProjeto[]>('/api/projetos'));
  const [demoSpec, setDemoSpec] = useState<VideoSpec | null>(null);

  useEffect(() => {
    const ocupado = projetos.dados?.some((p) => p.status === 'gerando' || p.status === 'renderizando');
    if (!ocupado) return;
    const t = window.setInterval(projetos.recarregar, 4000);
    return () => window.clearInterval(t);
  }, [projetos.dados]); // eslint-disable-line react-hooks/exhaustive-deps

  const verDemo = () => api.get<{ spec: VideoSpec }>('/api/demo').then((r) => setDemoSpec(r.spec));
  useEffect(() => { if (demo) verDemo(); }, [demo]);

  const semChaves = estado.dados && !estado.dados.provedores.some((p) => p.configurada);
  return (
    <div className="pilha">
      <div className="linha-entre">
        <div>
          <p className="suave mini forte" style={{ letterSpacing: '.08em' }}>VIBE STUDIO</p>
          <h1>Seus vídeos</h1>
        </div>
        {estado.dados && <span className="selo" title="Gasto estimado com as IAs neste mês">{dolar(estado.dados.custoMes.total)} no mês</span>}
      </div>

      {estado.dados?.avisos.map((a) => <div key={a} className="aviso"><Icone nome="info" /><span>{a}</span></div>)}
      {semChaves && (
        <div className="aviso info">
          <Icone nome="info" />
          <div className="pilha-p">
            <span>Você está no <b>modo demonstração</b>: o app já monta vídeos com as suas fotos, o mascote, música e efeitos. Para ter voz, imagens criadas por IA e roteiro inteligente, conecte as chaves.</span>
            <a href="#/guia" className="forte">Como conseguir as chaves →</a>
          </div>
        </div>
      )}

      <a className="heroi" href="#/novo">
        <h2>Criar vídeo novo</h2>
        <p>Conte o que você quer, mande algumas fotos e a equipe de IAs faz roteiro, narração, imagens, edição e legenda.</p>
        <span className="botao"><Icone nome="raio" /> Começar</span>
      </a>

      {demoSpec ? (
        <div className="cartao pilha">
          <div className="linha-entre"><h3>Demonstração</h3><button className="icone-botao" onClick={() => setDemoSpec(null)} aria-label="Fechar"><Icone nome="x" /></button></div>
          <PlayerVideo spec={demoSpec} maxAltura={520} autoPlay />
          <p className="dica centro">Este vídeo é montado ao vivo no seu celular, com o mesmo motor que gera o MP4.</p>
        </div>
      ) : (
        <button className="botao contorno largo" onClick={verDemo}><Icone nome="play" /> Ver vídeo de demonstração</button>
      )}

      <h2 style={{ marginTop: 6 }}>Projetos</h2>
      {projetos.carregando && !projetos.dados && <Carregando />}
      {projetos.erro && <div className="aviso erro">{projetos.erro}</div>}
      {projetos.dados && projetos.dados.length === 0 && (
        <div className="cartao vazio">
          <Icone nome="video" tam={34} />
          <h3>Seu primeiro vídeo está a um toque</h3>
          <p className="suave pequeno">Toque em <b>Criar</b>, escreva o que você quer e envie fotos do produto ou da loja.</p>
        </div>
      )}
      <div className="lista-projetos">
        {projetos.dados?.map((p) => (
          <a key={p.id} className="projeto-cartao" href={`#/projeto/${p.id}`}>
            <div className="projeto-capa" style={{ aspectRatio: p.formato === '16:9' ? '16 / 10' : p.formato === '1:1' ? '1' : '9 / 13' }}>
              {p.capa ? <img src={p.capa} alt="" loading="lazy" /> : <span className="suave">{p.status === 'erro' ? <Icone nome="info" tam={30} /> : <Girando tam={28} />}</span>}
              <span className={`selo ${STATUS[p.status].c}`}>{STATUS[p.status].t}</span>
            </div>
            <div className="projeto-info">
              <span className="t">{p.titulo}</span>
              <span className="mini suave">{dataCurta(p.criadoEm)}{p.segundos ? ` · ${p.segundos}s` : ''}{p.versoes > 1 ? ` · v${p.versao}` : ''}{p.custo > 0 ? ` · ${dolar(p.custo)}` : ''}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
