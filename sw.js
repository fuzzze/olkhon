// сервис-воркер «Внутреннего Ольхона» (собран tools/pwa.js) — сборка mwbst71f
const CACHE = 'olkhon-mwbst71f';
const FILES = ["./assets/main-BgLjZat9.js","./assets/main-COR_XtNO.css","./assets/places-BK0aS10V.js","./assets/words-5mVpcSdJ.css","./assets/words-CeV6j3G2.js","./favicon.svg","./film/print-1.jpg","./film/print-2.jpg","./film/print-3.jpg","./fonts/OFL-Inter.txt","./fonts/OFL-JetBrainsMono.txt","./fonts/OFL-Jost.txt","./fonts/inter-800.typeface.json","./fonts/jetbrains-mono-cyrillic-400-normal.woff2","./fonts/jetbrains-mono-latin-400-normal.woff2","./fonts/jost-cyrillic-300-normal.woff2","./fonts/jost-cyrillic-400-italic.woff2","./fonts/jost-cyrillic-500-normal.woff2","./fonts/jost-latin-300-normal.woff2","./fonts/jost-latin-400-italic.woff2","./fonts/jost-latin-500-normal.woff2","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./index.html","./manifest.webmanifest","./models/gull.glb","./models/sk/char-backpack.json","./models/sk/index.json","./models/sk/sup-board.json","./models/sk/tree-birch.json","./models/sk/tree-pine.json","./models/sk/tree-spruce.json","./models/survivor.glb","./models/uaz.glb","./terrain/buildings.json","./terrain/far.bin","./terrain/far.json","./terrain/horizon.json","./terrain/olkhon.bin","./terrain/olkhon.json","./terrain/roads.json","./words.html","./"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('olkhon-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  const path = new URL(r.url).pathname;
  if (path.endsWith('/version.json')) return; // номер сборки — всегда из сети
  if (r.mode === 'navigate') {
    // страница: сначала сеть (свежая сборка), без сети — из кэша
    e.respondWith(fetch(r).catch(() => caches.match(r, { ignoreSearch: true }).then((m) => m || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then((m) => m || fetch(r).then((res) => {
    if (res.ok) caches.open(CACHE).then((c) => c.put(r, res.clone()));
    return res;
  })));
});
