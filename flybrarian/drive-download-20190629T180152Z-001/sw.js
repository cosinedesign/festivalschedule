const CACHE_NAME = 'fly-cache-v1';
const urlsToCache = [
    '/home.html',
    '/style/style.css',
    '/script/site.js'
];

self.addEventListener('install', event => {
    // console.info('service worker is being installed');

    event.waitUntil(
        caches.open(CACHE_NAME)
            // add files to cache
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    // console.info('activate event detected');

    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    // remove old cache
                    console.log('removing old cache', key);

                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', event => {
    // console.info('fetch event detected');

    event.respondWith(
        // try to fetch over the network
        fetch(event.request)
            .catch(() => {
                // network request failed; serve from cache instead
                return caches.match(event.request);
            })
    );
});
