import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './estilo.css';
import { api } from './api';
import { Carregando, Navegacao, ProvedorToast, STANDALONE, ir, useRota } from './ui';
import { Login } from './telas/Login';
import { Inicio } from './telas/Inicio';
import { Novo } from './telas/Novo';
import { ProjetoTela } from './telas/Projeto';
import { Marcas } from './telas/Marcas';
import { Vozes } from './telas/Vozes';
import { AjustesTela } from './telas/Ajustes';
import { Guia } from './telas/Guia';
import { Logos } from './telas/Logos';
import { Sites } from './telas/Sites';

const App: React.FC = () => {
  const rota = useRota();
  const [logado, setLogado] = useState<boolean | null>(null);
  const [senhaDefinida, setSenhaDefinida] = useState(true);

  useEffect(() => {
    api.get<{ logado: boolean; senhaDefinida: boolean }>('/api/sessao').then((s) => { setLogado(s.logado); setSenhaDefinida(s.senhaDefinida); }).catch(() => setLogado(false));
    const sair = () => setLogado(false);
    window.addEventListener('sessao-expirada', sair);
    return () => window.removeEventListener('sessao-expirada', sair);
  }, []);

  if (logado === null) return <div className="app"><Carregando /></div>;
  if (!logado) return <div className="app"><Login senhaDefinida={senhaDefinida} aoEntrar={() => setLogado(true)} /></div>;

  const [tela, a, b] = rota;
  let conteudo: React.ReactNode;
  switch (tela) {
    case 'novo': conteudo = <Novo />; break;
    case 'projeto': conteudo = <ProjetoTela id={a} />; break;
    case 'marcas': conteudo = <Marcas id={a} />; break;
    case 'vozes': conteudo = <Vozes sub={a} />; break;
    case 'ajustes': conteudo = <AjustesTela aoSair={() => setLogado(false)} />; break;
    case 'guia': conteudo = <Guia secao={a} />; break;
    case 'logos': conteudo = <Logos />; break;
    case 'sites': conteudo = <Sites />; break;
    default: conteudo = <Inicio demo={a === 'demo'} />;
  }
  void b;
  return (
    <>
      {STANDALONE && <div className="faixa-teste">Versão de testes no navegador: roteiro simples, prévia ao vivo, música e efeitos. Voz, imagens por IA, chat com o Diretor e MP4 entram no app publicado.</div>}
      <div className="app">{conteudo}</div>
      <Navegacao atual={tela === 'projeto' ? 'inicio' : tela === 'guia' || tela === 'marcas' || tela === 'vozes' ? 'ajustes' : tela} />
    </>
  );
};

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#/"]');
  if (a) { e.preventDefault(); ir(a.getAttribute('href')!.slice(2)); }
});

createRoot(document.getElementById('raiz')!).render(
  <React.StrictMode>
    <ProvedorToast>
      <App />
    </ProvedorToast>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD && !STANDALONE) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
