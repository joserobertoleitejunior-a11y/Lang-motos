/** Configuração vinda das variáveis de ambiente (painel da hospedagem). */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const num = (v: string | undefined, padrao: number) => (v && Number.isFinite(Number(v)) ? Number(v) : padrao);
const dados = path.resolve(process.env.DATA_DIR || './data');

/**
 * Segredos internos: se não vierem da hospedagem, são criados uma vez e
 * guardados no disco persistente (só o servidor lê). Assim a única variável
 * obrigatória é SENHA_APP.
 */
function segredoPersistente(nome: 'sessao' | 'chaves', env: string | undefined): { valor: string; origem: 'hospedagem' | 'automatico' } {
  if (env && env.length >= 16) return { valor: env, origem: 'hospedagem' };
  const arq = path.join(dados, 'segredos.json');
  let s: Record<string, string> = {};
  try { s = JSON.parse(fs.readFileSync(arq, 'utf8')); } catch { /* primeira vez */ }
  if (!s[nome]) {
    s[nome] = crypto.randomBytes(32).toString('base64url');
    fs.mkdirSync(dados, { recursive: true });
    fs.writeFileSync(arq, JSON.stringify(s, null, 2), { mode: 0o600 });
  }
  return { valor: s[nome], origem: 'automatico' };
}

const sessao = segredoPersistente('sessao', process.env.SEGREDO_SESSAO);
const chaves = segredoPersistente('chaves', process.env.SEGREDO_CHAVES);

export const CONFIG = {
  porta: num(process.env.PORT, 8080),
  host: process.env.HOST || '0.0.0.0',
  dados,
  publico: path.resolve(process.env.PUBLIC_DIR || './public'),
  web: path.resolve(process.env.WEB_DIR || './dist/web'),
  senha: process.env.SENHA_APP || '',
  segredoSessao: sessao.valor,
  segredoChaves: chaves.valor,
  segredoChavesOrigem: chaves.origem,
  chrome: process.env.CHROME_PATH || undefined,
  modeloClaude: process.env.MODELO_CLAUDE || 'claude-opus-5-5',
  esforcoClaude: (process.env.ESFORCO_CLAUDE || 'medium') as 'low' | 'medium' | 'high' | 'xhigh' | 'max',
  limiteCustoVideo: num(process.env.LIMITE_CUSTO_VIDEO_USD, 3),
  limiteCustoMes: num(process.env.LIMITE_CUSTO_MES_USD, 60),
  producao: process.env.NODE_ENV === 'production',
};

export function validarConfig(): string[] {
  const avisos: string[] = [];
  if (!CONFIG.senha) avisos.push('A senha do app (SENHA_APP) não foi definida na hospedagem.');
  else if (CONFIG.senha.length < 10) avisos.push('A senha do app é curta: use pelo menos 10 caracteres em SENHA_APP.');
  return avisos;
}
