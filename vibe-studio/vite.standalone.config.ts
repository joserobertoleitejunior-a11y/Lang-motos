import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Versão do app que roda inteira no navegador (sem servidor): vira um arquivo único. */
export default defineConfig({
  root: 'web',
  define: { 'import.meta.env.VITE_STANDALONE': JSON.stringify('1') },
  plugins: [
    react(),
    { name: 'sem-fontes-locais', enforce: 'pre', transform(code, id) { return id.endsWith('estilo.css') ? { code: code.replace(/@font-face\s*\{[^}]*\}\s*/g, ''), map: null } : null; } },
  ],
  resolve: { alias: [{ find: /^(\.\.?)\/api$/, replacement: path.resolve('web/src/api.local.ts') }] },
  build: {
    outDir: '../dist/standalone', emptyOutDir: true, cssCodeSplit: false, sourcemap: false, chunkSizeWarningLimit: 4000,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app[extname]' } },
  },
});
