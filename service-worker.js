// =========================================
// CORΛX SERVICE-WORKER.JS
// Premium PWA Engine
// Offline + Cache + Speed
// =========================================

// =========================================
// CACHE
// =========================================

const CACHE_NAME = "corax-v1";

// =========================================
// FILES
// =========================================

const FILES_TO_CACHE = [

    "/",
    "/index.html",
    "/dashboard.html",
    "/splash.html",

    "/style.css",
    "/charts.css",

    "/app.js",
    "/dashboard.js",
    "/charts.js",
    "/fx.js",
    "/splash.js",

    "/manifest.json"

];

// =========================================
// INSTALL
// =========================================

self.addEventListener("install", event => {

    console.log("CORΛX SW Installed");

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});

// =========================================
// ACTIVATE
// =========================================

self.addEventListener("activate", event => {

    console.log("CORΛX SW Activated");

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

});

// =========================================
// FETCH
// =========================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );

});

// =========================================
// BACKGROUND SYNC
// =========================================

self.addEventListener("sync", event => {

    console.log("CORΛX Background Sync");

});

// =========================================
// PUSH
// =========================================

self.addEventListener("push", event => {

    const data =
        event.data
        ? event.data.text()
        : "CORΛX Notification";

    event.waitUntil(

        self.registration.showNotification(

            "CORΛX",

            {

                body: data,

                icon: "/icon-192.png"

            }

        )

    );

});

// =========================================
// READY
// =========================================

console.log("CORΛX PWA ACTIVE 🚀");
