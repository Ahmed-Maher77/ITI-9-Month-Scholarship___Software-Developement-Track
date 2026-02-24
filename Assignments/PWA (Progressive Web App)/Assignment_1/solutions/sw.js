const CACHE_NAME = "installable-app-cache-v2";
const assetsToCache = [
    "./",
    "index.html",
    "styles.css",
    "main.js",
    "pages/about.html",
    "pages/contact.html",
    "pages/offline.html",
    "pages/404.html",
];

// Installation
self.addEventListener("install", (e) => {
    console.log("service worker installed");

    // update the old cache with the new one
    self.skipWaiting();                               // to activate the new service worker immediately without waiting for the old one to be loaded

    // Cache the static assets
    e.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(assetsToCache);
        })(),
    );
});

// Activation
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name)),
                ),
            ),
    );
});

// Fetch
self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET") {
        e.respondWith(fetch(e.request));
        return;
    }

    e.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(e.request);

            if (cachedResponse) {
                return cachedResponse;
            }

            try {
                const networkResponse = await fetch(e.request);

                if (networkResponse.status === 404) {
                    return cache.match("pages/404.html");
                }

                if (networkResponse.ok) {
                    cache.put(e.request, networkResponse.clone());
                }

                return networkResponse;
            } catch (error) {
                return cache.match("pages/offline.html");
            }
        })(),
    );
});
