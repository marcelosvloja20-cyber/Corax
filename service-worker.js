// =========================================
// CORΛX SERVICE-WORKER.JS
// PWA Offline Cache System
// =========================================

// =========================================
// CACHE
// =========================================

const CACHE_NAME =
    "corax-cache-v1";

// =========================================
// FILES
// =========================================

const urlsToCache = [

    "/",

    "/index.html",

    "/dashboard.html",

    "/market.html",

    "/offline.html",

    "/settings.html",

    "/style.css",

    "/pwa.css",

    "/app.js",

    "/wallet.js",

    "/charts.js",

    "/fx.js",

    "/api.js",

    "/notifications.js",

    "/manifest.json"

];

// =========================================
// INSTALL
// =========================================

self.addEventListener(

    "install",

    event => {

        event.waitUntil(

            caches.open(

                CACHE_NAME

            ).then(cache => {

                console.log(
                    "CORΛX Cache Installed 🚀"
                );

                return cache.addAll(
                    urlsToCache
                );

            })

        );

    }

);

// =========================================
// FETCH
// =========================================

self.addEventListener(

    "fetch",

    event => {

        event.respondWith(

            caches.match(

                event.request

            ).then(response => {

                // =====================
                // CACHE
                // =====================

                if(response){

                    return response;

                }

                // =====================
                // NETWORK
                // =====================

                return fetch(

                    event.request

                ).catch(() => {

                    // =================
                    // OFFLINE PAGE
                    // =================

                    if(

                        event.request.mode
                        ===
                        "navigate"

                    ){

                        return caches.match(

                            "/offline.html"

                        );

                    }

                });

            })

        );

    }

);

// =========================================
// ACTIVATE
// =========================================

self.addEventListener(

    "activate",

    event => {

        event.waitUntil(

            caches.keys().then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if(

                            key !== CACHE_NAME

                        ){

                            console.log(
                                "Old cache removed"
                            );

                            return caches.delete(
                                key
                            );

                        }

                    })

                );

            })

        );

    }

);

// =========================================
// READY
// =========================================

console.log(
    "CORΛX Service Worker Active ⚡"
);
