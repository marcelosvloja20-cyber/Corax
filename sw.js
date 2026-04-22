self.addEventListener('install', (e) => {
 e.waitUntil(
   caches.open('corax-store').then((cache) => cache.addAll([
     '/',
     '/index.html',
     '/login.html',
     '/app.html',
     '/9a79db2d-571d-48b1-b270-0428e3dde4de.png',
   ])),
 );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
