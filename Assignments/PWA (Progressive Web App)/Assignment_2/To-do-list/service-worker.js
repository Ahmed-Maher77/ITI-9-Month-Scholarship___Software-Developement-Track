const CACHE_NAME = "todoList_iti-v1";
const assets = [
	"/",
    "index.html",
    "pages/offline.html",
    "pages/404.html",
    "style.css",
    "js/app.js",
    "js/pushNotificationsHandler.js",
    "js/databaseManager.js",
    "images/logo.png",
    // Cache Bootstrap
    "packages/bootstrap-5.3.8-dist/css/bootstrap.min.css",
    "packages/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js",
    // Cache Google Fonts + Font Awesome
    "https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
];


// 2. Installation
self.addEventListener("install", (event) => {
    // update the old service worker with the new one
    self.skipWaiting();

    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                await cache.addAll(assets);
            } catch {}
        })(),
    );
});

// 3. Activation
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            try {
                // Clear old caches
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames
                        .filter((cache) => cache !== CACHE_NAME)
                        .map((cache) => caches.delete(cache)),
                );

                // Take control of all clients immediately
                await self.clients.claim();
            } catch {}
        })(),
    );
});


// 4. Fetch Event: Network-first, cache fallback when offline
self.addEventListener("fetch", (event) => {
	event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            try {
                const networkResponse = await fetch(event.request);

                if (networkResponse.status === 404) {
                    // return cached custom 404 page if available
                    const notFoundPage = await cache.match("pages/404.html");
                    return notFoundPage || networkResponse;
                }

                if (networkResponse.ok) {
                    cache.put(event.request, networkResponse.clone());
                }

                return networkResponse;
            } catch (error) {
                // On network error, try cached version of the request first
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Then fall back to cached offline page if available
                const offlinePage = await cache.match("pages/offline.html");
                return offlinePage || new Response("You are offline.", { status: 503 });
            }
        })(),
    );
});



// Handle notification click events
self.addEventListener("notificationclick", (event) => {
    const taskId = event.notification && event.notification.data;

    if (event.action === "close") {
        event.notification.close();
        return;
    }

    // Default click or "open" action: focus/open the app and tell it which task to show
    event.waitUntil(
        (async () => {
            try {
                const clientList = await clients.matchAll({
                    type: "window",
                    includeUncontrolled: true,
                });

                if (clientList.length > 0) {
                    const client = clientList[0];
                    if ("focus" in client) {
                        await client.focus();
                    }

                    // Send a message to the page with the taskId
                    if (taskId) {
                        client.postMessage({
                            type: "OPEN_TASK",
                            taskId,
                        });
                    }
                } else {
                    // If no client open, open a new window
                    await clients.openWindow("/");
                }
            } finally {
                event.notification.close();
            }
        })(),
    );
});
