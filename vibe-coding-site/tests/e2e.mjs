/**
 * Testes de ponta a ponta (Playwright): npm test
 * Sobe um servidor local, abre o site no computador e no celular e confere o caminho principal:
 * página sem rolagem lateral, portfólio, briefing que gera a mensagem do WhatsApp, arcade e Mundo 3D.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

const servidor = http.createServer((q, s) => {
  let u = decodeURIComponent(q.url.split('?')[0]);
  if (u.endsWith('/')) u += 'index.html';
  const f = path.join(raiz, u);
  if (!f.startsWith(raiz) || !fs.existsSync(f)) { s.writeHead(404); s.end('404'); return; }
  s.writeHead(200, { 'content-type': tipos[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
}).listen(0);
const base = `http://127.0.0.1:${servidor.address().port}`;
const args = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
let falhas = 0;

async function teste(nome, fn) {
  try { await fn(); console.log(`  ok  ${nome}`); }
  catch (e) { falhas++; console.log(`  FALHOU  ${nome}\n        ${String(e.message || e).split('\n')[0]}`); }
}

const navegador = await chromium.launch({ args });
async function pagina(celular = false) {
  const ctx = await navegador.newContext(celular ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 860 } });
  const p = await ctx.newPage();
  const erros = [];
  p.on('pageerror', (e) => erros.push(String(e)));
  await p.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  return { p, erros, ctx };
}

console.log('Site Vibe Coding Process');

for (const celular of [false, true]) {
  const nomeTela = celular ? 'celular' : 'computador';
  await teste(`página inicial no ${nomeTela}: sem rolagem lateral e sem erros`, async () => {
    const { p, erros, ctx } = await pagina(celular);
    await p.goto(base + '/');
    await p.waitForTimeout(1200);
    const [sw, iw] = await p.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    assert.ok(sw <= iw, `rolagem lateral: ${sw} > ${iw}`);
    assert.deepEqual(erros, []);
    await ctx.close();
  });
}

await teste('portfólio: todos os projetos com imagem e links seguros', async () => {
  const { p, ctx } = await pagina();
  await p.goto(base + '/');
  const cards = await p.locator('.projeto').count();
  const total = Number(await p.locator('[data-total-projetos]').first().textContent());
  assert.ok(cards >= 8, `poucos projetos: ${cards}`);
  assert.equal(cards, total);
  const links = await p.locator('.projeto a').evaluateAll((as) => as.map((a) => [a.target, a.rel]));
  for (const [t, r] of links) { assert.equal(t, '_blank'); assert.ok(r.includes('noopener')); }
  const imagens = await p.locator('.projeto img').evaluateAll((is) => is.map((i) => i.getAttribute('src')));
  for (const src of imagens) assert.ok(fs.existsSync(path.join(raiz, src)), `imagem faltando: ${src}`);
  await p.locator('.filtro', { hasText: 'Beleza' }).click();
  assert.equal(await p.locator('.projeto').count(), 1);
  await ctx.close();
});

await teste('briefing: valida e monta a mensagem do WhatsApp', async () => {
  const { p, ctx } = await pagina();
  await p.goto(base + '/');
  await p.evaluate(() => { window.__abertos = []; window.open = (u) => { window.__abertos.push(u); return {}; }; });
  await p.locator('#b-enviar').click();
  assert.match(await p.locator('#b-erro').textContent(), /nome/i);
  await p.fill('#b-nome', 'Ana');
  await p.fill('#b-negocio', 'Ana Doces');
  await p.selectOption('#b-segmento', { index: 1 });
  await p.locator('.opcao', { hasText: 'Site' }).click();
  await p.locator('#b-enviar').click();
  const [url] = await p.evaluate(() => window.__abertos);
  assert.ok(url?.startsWith('https://wa.me/5515996688070?text='), 'link do WhatsApp');
  const texto = decodeURIComponent(url.split('text=')[1]);
  assert.match(texto, /\*Nome:\* Ana/);
  assert.match(texto, /\*Negócio:\* Ana Doces/);
  assert.match(texto, /\*Preciso de:\* Site/);
  await ctx.close();
});

await teste('arcade: abre todos os jogos sem erro', async () => {
  const { p, erros, ctx } = await pagina();
  await p.goto(base + '/jogos.html');
  await p.waitForFunction(() => window.__arcade, null, { timeout: 20000 });
  const n = await p.evaluate(() => window.__arcade.jogos.length);
  assert.ok(n >= 7);
  for (let i = 0; i < n; i++) {
    await p.evaluate((i) => window.__arcade.iniciar(i), i);
    await p.keyboard.press('Space');
    await p.waitForTimeout(400);
    const estado = await p.evaluate(() => window.__arcade.estado);
    assert.ok(['jogando', 'fim'].includes(estado), `jogo ${i}: ${estado}`);
  }
  assert.deepEqual(erros, []);
  await ctx.close();
});

await teste('Mundo 3D: carrega e tem o caminho de volta ao site', async () => {
  const { p, erros, ctx } = await pagina();
  await p.goto(base + '/mundo/?teste=1&q=baixa');
  await p.waitForFunction(() => window.__vcp, null, { timeout: 90000 });
  assert.equal(await p.locator('#bvoltar').getAttribute('href'), '../');
  const quadros = await p.evaluate(() => window.__vcp.quadros.quadros.length);
  assert.ok(quadros >= 10, `quadros: ${quadros}`);
  assert.deepEqual(erros, []);
  await ctx.close();
});

await navegador.close();
servidor.close();
console.log(falhas ? `\n${falhas} teste(s) falharam` : '\nTodos os testes passaram');
process.exit(falhas ? 1 : 0);
