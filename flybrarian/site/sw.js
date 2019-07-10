const CACHE_NAME = 'fly-cache-v16';
const urlsToCache = [
    '/flybrarian/index.htm',
    '/flybrarian/style/style.css',
    '/flybrarian/script/site.js',    
    '/flybrarian/style/assets/Flybrarian-Header.gif',
    '/flybrarian/style/assets/Flybrarian-Header-print.gif',
    '/flybrarian/style/assets/Flybrarian-Header-FOMO.gif',
    '/flybrarian/style/assets/icon-highres.png'
];

self.addEventListener('install', event => {
    // console.info('service worker is being installed');

    event.waitUntil(
        caches.open(CACHE_NAME)
            // add files to cache
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
            .catch(function (error) {
                console.log(error);
            })
    );
});

self.addEventListener('activate', event => {
    // console.info('activate event detected');

    event.waitUntil(
        caches.keys()
            .then(keyList => {
                return Promise.all(keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        // remove old cache
                        console.log('removing old cache', key);

                        return caches.delete(key);
                    }
                }));
            })
            .catch(function (error) {
                console.log(error);
            })
    );
});

// self.addEventListener('fetch', event => {
//     // console.info('fetch event detected');

//     event.respondWith(
//         // try to fetch over the network
//         fetch(event.request)
//             .catch(() => {
//                 // network request failed; serve from cache instead
//                 return caches.match(event.request);
//             })
//     );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function(err) {
        // If both fail, show a generic fallback:
        return caches.match('/flybrarian/index.htm');
        // However, in reality you'd have many different
        // fallbacks, depending on URL & headers.
        // Eg, a fallback silhouette image for avatars.
      })
    );
  });

//   self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       fetch(event.request).catch(function() {
//         return caches.match(event.request).catch(function(err) {
//             // If both fail, show a generic fallback:
//             return caches.match('/flybrarian/index.htm');
//             // However, in reality you'd have many different
//             // fallbacks, depending on URL & headers.
//             // Eg, a fallback silhouette image for avatars.
//           })        
//       })
//     );
//   });