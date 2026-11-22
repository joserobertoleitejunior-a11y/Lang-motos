import { ErroApi } from './tipos';
export * from './tipos';

async function tratar<T>(r: Response): Promise<T> {
  if (r.status === 401 && !location.hash.startsWith('#/entrar')) {
    window.dispatchEvent(new Event('sessao-expirada'));
  }
  const tipo = r.headers.get('content-type') ?? '';
  const dados = tipo.includes('application/json') ? await r.json() : null;
  if (!r.ok) throw new ErroApi((dados as { erro?: string } | null)?.erro ?? `Erro ${r.status}`, r.status);
  return dados as T;
}

export const api = {
  get: <T>(url: string) => fetch(url, { credentials: 'same-origin' }).then((r) => tratar<T>(r)),
  enviar: <T>(url: string, corpo?: unknown, metodo = 'POST') =>
    fetch(url, { method: metodo, credentials: 'same-origin', headers: corpo === undefined ? undefined : { 'Content-Type': 'application/json' }, body: corpo === undefined ? undefined : JSON.stringify(corpo) }).then((r) => tratar<T>(r)),
  formulario: <T>(url: string, form: FormData) => fetch(url, { method: 'POST', credentials: 'same-origin', body: form }).then((r) => tratar<T>(r)),
  apagar: <T>(url: string) => fetch(url, { method: 'DELETE', credentials: 'same-origin' }).then((r) => tratar<T>(r)),
  audio: async (url: string, corpo: unknown): Promise<Blob> => {
    const r = await fetch(url, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    if (!r.ok) {
      const d = await r.json().catch(() => null);
      throw new ErroApi((d as { erro?: string } | null)?.erro ?? `Erro ${r.status}`, r.status);
    }
    return r.blob();
  },
};

