const staticCacheName  = 'v1';
const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    'main.js'
];

// Call Install Event
self.addEventListener('install', (event) => {
    console.log("Service worker installed");
    // Wait for the Worker
    event.waitUntil(
        // open a cache with the name we specified above
        caches.open(staticCacheName)
            .then( cache => {
                console.log("Caching Files");
                return cache.addAll(cacheAssets)
            })
            .catch(error => {
                console.log("Error", error);
            })
    )
});

// Call Activate Event
self.addEventListener('activate', (event) => {
    console.log("Service worker Activated");
    // Remove unwanted caches
    event.waitUntil(
        caches.keys()
            .then( cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== staticCacheName) {
                            console.log("Service Worker clearing old cache");
                            return caches.delete(cache);
                        }
                    })
                )
            })
    )
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
    console.log("Fetching...");
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
});
