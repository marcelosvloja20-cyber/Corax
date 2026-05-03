/* ===================================
   CORΛX SERVICE WORKER v1
=================================== */

const CACHE_NAME = "corax-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/fx.js",
  "/logo.png",
  "/manifest.json"
];

/* INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

/* ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

/* FETCH */
self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then(response => {

      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(networkResponse => {

          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });

        })
        .catch(() => {

          return new Response("Offline", {
            headers: { "Content-Type": "text/plain" }
          });

        });

    })

  );

});
