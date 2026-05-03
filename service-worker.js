/* ===================================
   CORΛX SERVICE WORKER
=================================== */

const CACHE_NAME = "corax-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/fx.js",
  "/logo.png"
];

/* INSTALL */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

/* FETCH */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
