// Service worker simples: abre o app mesmo com internet ruim. Nunca guarda dados da API.
const CACHE = 'vibe-studio-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/') || u.pathname.startsWith('/midia/')) return;
  if (u.pathname.startsWith('/assets/') || u.pathname.startsWith('/fontes/')) {
    e.respondWith(caches.open(CACHE).then(async (c) => {
      const salvo = await c.match(e.request);
      if (salvo) return salvo;
      const r = await fetch(e.request);
      if (r.ok) c.put(e.request, r.clone());
      return r;
    }));
    return;
  }
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(CACHE).then((c) => c.put('/index.html', copia));
      return r;
    }).catch(() => caches.match('/index.html').then((r) => r || new Response('Sem conexão', { status: 503 }))));
  }
});
