/** Fila simples: limita quantos trabalhos pesados rodam ao mesmo tempo. */
export class Fila {
  private ativos = 0;
  private espera: (() => void)[] = [];
  constructor(private maximo: number) {}
  get ocupados() { return this.ativos; }
  get aguardando() { return this.espera.length; }
  async rodar<T>(fn: () => Promise<T>): Promise<T> {
    while (this.ativos >= this.maximo) await new Promise<void>((r) => this.espera.push(r));
    this.ativos++;
    try {
      return await fn();
    } finally {
      this.ativos--;
      this.espera.shift()?.();
    }
  }
}

export const filaGeracao = new Fila(2);
export const filaRender = new Fila(1);
