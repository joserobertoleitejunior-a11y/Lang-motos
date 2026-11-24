export type Nivel = 'alta' | 'media' | 'baixa';

export type Projeto = {
  id: string; titulo: string; tag: string; descricao: string; url: string | null; cor: string; imagem: string;
  /** false = não aparece no mundo (use enquanto o cliente não autorizou) */
  mostrar?: boolean; cliente?: boolean;
};

declare global {
  interface Window { __MUNDO_PROJETOS?: Projeto[]; __MUNDO_IMAGENS?: Record<string, string>; __MUNDO_FONTE?: string; __MUNDO_CODIGO?: { arquivo: string; texto: string }[]; __vcp?: unknown }
}

export const PARAMS = new URLSearchParams(location.search);
export const MOBILE = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && innerWidth < 900);

export function nivelInicial(): Nivel {
  const q = PARAMS.get('q');
  if (q === 'alta' || q === 'media' || q === 'baixa') return q;
  return MOBILE ? 'baixa' : 'alta';
}

export type Ajustes = {
  segTerreno: number; arvores: number; capim: number; flores: number; sombra: number; reflexo: number; pixel: number; nuvens: boolean; pedras: number; juncos: number;
};
export function ajustesDe(n: Nivel): Ajustes {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  if (n === 'alta') return { segTerreno: 384, arvores: 2600, capim: 90000, flores: 2500, sombra: 2048, reflexo: 0.5, pixel: Math.min(dpr, 1.75), nuvens: true, pedras: 220, juncos: 900 };
  if (n === 'media') return { segTerreno: 280, arvores: 1500, capim: 42000, flores: 1400, sombra: 1024, reflexo: 0.4, pixel: Math.min(dpr, 1.4), nuvens: true, pedras: 140, juncos: 500 };
  return { segTerreno: 200, arvores: 700, capim: 16000, flores: 600, sombra: 0, reflexo: 0.28, pixel: 1, nuvens: true, pedras: 70, juncos: 250 };
}
