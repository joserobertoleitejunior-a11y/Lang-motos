import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ ícones (traço) */
const P: Record<string, string> = {
  casa: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  mais: 'M12 5v14M5 12h14',
  marca: 'M4 7h16v13H4zM8 7V4h8v3',
  micro: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  ajustes: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4',
  voltar: 'M15 5l-7 7 7 7',
  play: 'M7 4l13 8-13 8z',
  pausa: 'M7 4h3v16H7zM14 4h3v16h-3z',
  baixar: 'M12 4v11M7 11l5 5 5-5M5 20h14',
  compartilhar: 'M12 3v12M7 8l5-5 5 5M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6',
  copiar: 'M9 9h10v11H9zM5 15V4h10',
  enviar: 'M4 12l16-8-6 16-3-7z',
  foto: 'M4 7h3l2-3h6l2 3h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  lixo: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  check: 'M5 12.5l4.5 4.5L19 7',
  x: 'M6 6l12 12M18 6L6 18',
  raio: 'M13 3L5 14h6l-1 7 8-11h-6z',
  chave: 'M14 10a4 4 0 1 1-1.2-2.8L21 15v3h-3v-2h-2v-2h-2',
  info: 'M12 8h.01M11 12h1v5h1M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  estrela: 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.3 6-5.4-3-5.4 3 1.3-6L3.4 9.3l6-.7z',
  seta: 'M6 9l6 6 6-6',
  direita: 'M9 6l6 6-6 6',
  recarregar: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  sair: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11',
  video: 'M3 6h12v12H3zM15 10l6-3v10l-6-3',
  pessoa: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  onda: 'M3 12h2M7 8v8M11 5v14M15 8v8M19 11v2',
  livro: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
};

export const Icone: React.FC<{ nome: keyof typeof P | string; tam?: number; traco?: number; className?: string }> = ({ nome, tam = 22, traco = 2, className }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={traco} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d={P[nome] ?? P.info} />
  </svg>
);

export const Girando: React.FC<{ tam?: number }> = ({ tam = 18 }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" className="girando" aria-hidden>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ navegação por hash */
export const STANDALONE = import.meta.env.VITE_STANDALONE === '1';
const lerHash = () => (location.hash.replace(/^#\/?/, '') || 'inicio');
let rotaInterna = STANDALONE ? 'inicio' : lerHash();
const ouvintes = new Set<() => void>();
export function useRota(): string[] {
  const [r, setR] = useState(() => (STANDALONE ? rotaInterna : lerHash()));
  useEffect(() => {
    const f = () => { setR(STANDALONE ? rotaInterna : lerHash()); window.scrollTo(0, 0); };
    if (STANDALONE) { ouvintes.add(f); return () => { ouvintes.delete(f); }; }
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return r.split('/');
}
export const ir = (rota: string) => {
  if (STANDALONE) { rotaInterna = rota; ouvintes.forEach((f) => f()); } else location.hash = `#/${rota}`;
};

/* ------------------------------------------------------------------ avisos rápidos */
const CtxToast = createContext<(msg: string) => void>(() => {});
export const ProvedorToast: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [msg, setMsg] = useState<string | null>(null);
  const t = useRef<number>(0);
  const mostrar = useCallback((m: string) => {
    setMsg(m);
    window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setMsg(null), 3200);
  }, []);
  return (
    <CtxToast.Provider value={mostrar}>
      {children}
      {msg && <div className="toast" role="status">{msg}</div>}
    </CtxToast.Provider>
  );
};
export const useToast = () => useContext(CtxToast);

/* ------------------------------------------------------------------ peças */
export const Topo: React.FC<{ titulo: string; voltar?: string; direita?: React.ReactNode }> = ({ titulo, voltar, direita }) => (
  <div className="topo">
    {voltar !== undefined && (
      <button className="voltar" aria-label="Voltar" onClick={() => (voltar ? ir(voltar) : history.back())}>
        <Icone nome="voltar" />
      </button>
    )}
    <h1>{titulo}</h1>
    {direita}
  </div>
);

export const Interruptor: React.FC<{ ligado: boolean; aoMudar: (v: boolean) => void; rotulo?: string }> = ({ ligado, aoMudar, rotulo }) => (
  <label className="interruptor" aria-label={rotulo}>
    <input type="checkbox" checked={ligado} onChange={(e) => aoMudar(e.target.checked)} />
    <span />
  </label>
);

export function Chips<T extends string>({ opcoes, valor, aoMudar }: { opcoes: { v: T; t: string }[]; valor: T; aoMudar: (v: T) => void }) {
  return (
    <div className="chips">
      {opcoes.map((o) => (
        <button key={o.v} type="button" className={`chip ${valor === o.v ? 'ativo' : ''}`} onClick={() => aoMudar(o.v)}>
          {valor === o.v && <Icone nome="check" tam={16} traco={2.6} />}
          {o.t}
        </button>
      ))}
    </div>
  );
}

export const Navegacao: React.FC<{ atual: string }> = ({ atual }) => {
  const item = (rota: string, nome: string, icone: string, extra = '') => (
    <a href={`#/${rota}`} className={`${atual === rota ? 'ativo' : ''} ${extra}`}>
      {extra === 'criar' ? <span className="bolha"><Icone nome={icone} tam={26} traco={2.4} /></span> : <Icone nome={icone} />}
      <span>{nome}</span>
    </a>
  );
  return (
    <nav className="nav" aria-label="Menu">
      <div className="nav-dentro">
        {item('inicio', 'Vídeos', 'video')}
        {item('logos', 'Logos', 'estrela')}
        {item('novo', 'Criar', 'mais', 'criar')}
        {item('sites', 'Sites', 'casa')}
        {item('ajustes', 'Ajustes', 'ajustes')}
      </div>
    </nav>
  );
};

export function useCarregar<T>(fn: () => Promise<T>, deps: unknown[] = []): { dados: T | null; erro: string | null; recarregar: () => void; carregando: boolean } {
  const [dados, setDados] = useState<T | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    let vivo = true;
    setCarregando(true);
    fn().then((d) => { if (vivo) { setDados(d); setErro(null); } }).catch((e) => { if (vivo) setErro((e as Error).message); }).finally(() => vivo && setCarregando(false));
    return () => { vivo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, n]);
  return { dados, erro, carregando, recarregar: () => setN((x) => x + 1) };
}

export const Carregando: React.FC<{ texto?: string }> = ({ texto = 'Carregando…' }) => (
  <div className="vazio suave"><Girando tam={26} /><span>{texto}</span></div>
);
