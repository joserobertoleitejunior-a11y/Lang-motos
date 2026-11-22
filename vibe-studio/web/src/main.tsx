import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './estilo.css';
import { api } from './api';
import { Carregando, Navegacao, ProvedorToast, useRota } from './ui';
import { Login } from './telas/Login';
import { Inicio } from './telas/Inicio';
import { Novo } from './telas/Novo';
import { ProjetoTela } from './telas/Projeto';
import { Marcas } from './telas/Marcas';
import { Vozes } from './telas/Vozes';
import { AjustesTela } from './telas/Ajustes';
import { Guia } from './telas/Guia';

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
    default: conteudo = <Inicio demo={a === 'demo'} />;
  }
  void b;
  return (
    <>
      <div className="app">{conteudo}</div>
      <Navegacao atual={tela === 'projeto' ? 'inicio' : tela === 'guia' ? 'ajustes' : tela} />
    </>
  );
};

createRoot(document.getElementById('raiz')!).render(
  <React.StrictMode>
    <ProvedorToast>
      <App />
    </ProvedorToast>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
