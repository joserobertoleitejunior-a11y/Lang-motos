/** Guarda rascunhos no navegador (se estiver bloqueado, o app continua funcionando). */
export function ler<T>(chave: string, padrao: T): T {
  try { const v = localStorage.getItem('vcp:' + chave); return v ? (JSON.parse(v) as T) : padrao; } catch { return padrao; }
}
export function gravar(chave: string, valor: unknown) {
  try { localStorage.setItem('vcp:' + chave, JSON.stringify(valor)); } catch { /* sem armazenamento */ }
}
