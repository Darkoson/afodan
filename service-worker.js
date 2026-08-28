/* AFODAN service worker — offline app shell.
   Caches same-origin assets + the Firebase SDK; never intercepts Firestore/Auth
   network traffic (those go straight to the network / Firestore's own cache). */
const CACHE = 'afodan-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                 // let Firestore writes / auth pass through
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isSDK = url.host === 'www.gstatic.com';     // Firebase SDK scripts

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return r; })
                .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  if (sameOrigin || isSDK) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(r => {
        const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r;
      }).catch(() => cached))
    );
  }
  // everything else (firestore.googleapis.com, identitytoolkit, etc.) → default network
});
