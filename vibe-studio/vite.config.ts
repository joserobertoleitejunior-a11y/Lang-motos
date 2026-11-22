import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const servidor = 'http://localhost:8787';

export default defineConfig({
  root: 'web',
  plugins: [react()],
  build: { outDir: '../dist/web', emptyOutDir: true, chunkSizeWarningLimit: 2500, sourcemap: false },
  server: {
    port: 5173,
    fs: { allow: ['..'] },
    proxy: Object.fromEntries(['/api', '/midia', '/fontes', '/sfx', '/musica', '/demo'].map((p) => [p, servidor])),
  },
});
