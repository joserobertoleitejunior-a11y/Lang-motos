/** Monta o mundo em um único arquivo: node mundo/construir.mjs */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(aqui, 'dist');
fs.mkdirSync(dist, { recursive: true });

// 1) código
const r = await build({
  entryPoints: [path.join(aqui, 'src/main.ts')], bundle: true, minify: !process.env.SEM_MINIFICAR, format: 'iife', target: 'es2020', platform: 'browser',
  write: false, legalComments: 'none', define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'error',
});
const js = r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

// 2) projetos e imagens (PNG -> JPEG leve embutido)
const projetos = JSON.parse(fs.readFileSync(path.join(aqui, 'projetos.json'), 'utf8'));
const imagens = {};
const jpgDir = path.join(aqui, 'imagens/jpg');
fs.mkdirSync(jpgDir, { recursive: true });
for (const p of projetos) {
  const png = path.join(aqui, 'imagens', p.imagem + '.png');
  const jpg = path.join(jpgDir, p.imagem + '.jpg');
  if (!fs.existsSync(jpg) || fs.statSync(jpg).mtimeMs < fs.statSync(png).mtimeMs) execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', png, '-vf', 'scale=1024:-1', '-q:v', '5', jpg]);
  imagens[p.imagem] = 'data:image/jpeg;base64,' + fs.readFileSync(jpg).toString('base64');
}

// 3) fonte monoespaçada (letras do modo ASCII) e trechos reais de código para o painel
const fonte = 'data:font/woff2;base64,' + fs.readFileSync(path.join(aqui, '../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2')).toString('base64');
const trechosDef = [
  ['vento.ts', /^export function atualizarVento/, 12], ['agua.ts', /^export function alturaAgua/, 16], ['terreno.ts', /^export function altura\(/, 20],
  ['arvores.ts', /^export function injetarVento/, 22], ['animais.ts', /^function .*pastar|^export function criarFauna/, 16], ['quadros.ts', /^export function criarQuadros/, 18],
];
const codigo = [];
for (const [arq, re, n] of trechosDef) {
  const l = fs.readFileSync(path.join(aqui, 'src', arq), 'utf8').split('\n');
  const i = l.findIndex((x) => re.test(x));
  if (i >= 0) codigo.push({ arquivo: 'mundo/src/' + arq, texto: l.slice(i, i + n).map((x) => x.slice(0, 74)).join('\n') });
}

const css = fs.readFileSync(path.join(aqui, 'src/mundo.css'), 'utf8');
const titulo = 'Mundo VCP';
const fontes = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap">';
const dados = `<script>window.__MUNDO_PROJETOS=${JSON.stringify(projetos)};window.__MUNDO_IMAGENS=${JSON.stringify(imagens)};window.__MUNDO_FONTE=${JSON.stringify(fonte)};window.__MUNDO_CODIGO=${JSON.stringify(codigo)};</script>`;
const corpo = `<div id="app"></div>\n${dados}\n<script>${js}</script>`;

// arquivo completo (hospedagem própria: Netlify, GitHub Pages)
fs.writeFileSync(path.join(dist, 'index.html'), `<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0b1020"><title>${titulo}</title>${fontes}<style>html,body{margin:0;background:#0b1020}${css}</style></head><body>${corpo}</body></html>\n`);
// fragmento para o Artifact (sem html/head/body)
fs.writeFileSync(path.join(dist, 'artefato.html'), `<title>${titulo}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${fontes}\n<style>${css}</style>\n${corpo}\n`);
console.log('ok', Math.round(js.length / 1024) + ' KB de código,', Object.keys(imagens).length, 'imagens,', Math.round(fs.statSync(path.join(dist, 'index.html')).size / 1024) + ' KB no total');

// 4) versão para o site da Vibe Coding (SITE_DIR=../../vibe-coding-process/mundo): imagens em arquivos, código em mundo.js
if (process.env.SITE_DIR) {
  const destino = path.resolve(process.env.SITE_DIR);
  fs.mkdirSync(path.join(destino, 'img'), { recursive: true });
  const caminhos = {};
  for (const p of projetos) {
    fs.copyFileSync(path.join(jpgDir, p.imagem + '.jpg'), path.join(destino, 'img', p.imagem + '.jpg'));
    caminhos[p.imagem] = 'img/' + p.imagem + '.jpg';
  }
  fs.writeFileSync(path.join(destino, 'mundo.js'), r.outputFiles[0].text);
  const base = 'https://joserobertoleitejunior-a11y.github.io/vibe-coding-process/';
  const meta = `<meta name="description" content="Passeie por uma paisagem 3D feita em código pela Vibe Coding Process: lago com ondas, vento nas árvores, animais e os nossos projetos pendurados no ar."><link rel="canonical" href="${base}mundo/"><meta property="og:title" content="Mundo VCP 3D"><meta property="og:description" content="Uma paisagem inteira feita em código, com os projetos da Vibe Coding Process flutuando sobre o lago."><meta property="og:type" content="website"><meta property="og:url" content="${base}mundo/"><meta property="og:image" content="${base}assets/img/mundo.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">`;
  const dadosSite = `<script>window.__MUNDO_PROJETOS=${JSON.stringify(projetos)};window.__MUNDO_IMAGENS=${JSON.stringify(caminhos)};window.__MUNDO_FONTE=${JSON.stringify(fonte)};window.__MUNDO_CODIGO=${JSON.stringify(codigo)};window.__MUNDO_VOLTAR='../';</script>`;
  fs.writeFileSync(path.join(destino, 'index.html'), `<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0b1020"><title>${titulo} · Vibe Coding Process</title>${meta}${fontes}<style>html,body{margin:0;background:#0b1020}${css}</style></head><body><div id="app"></div>\n${dadosSite}\n<script src="mundo.js"></script></body></html>\n`);
  console.log('site:', destino);
}
