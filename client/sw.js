import {manifest, version} from '@parcel/service-worker';

/*
const CACHE_NAME = 'fly-cache-v16';
const urlsToCache = [
    './index.htm',
    './style/style.css',
    './script/site.js',    
    './style/assets/Flybrarian-Header.gif',
    './style/assets/Flybrarian-Header-print.gif',
    './style/assets/Flybrarian-Header-FOMO.gif',
    './style/assets/icon-highres.png'
];
*/

self.addEventListener('install', async e => {
    // console.info('service worker is being installed');
    const cache = await caches.open(version);
    console.log("AddAll", manifest);
    await cache.addAll(manifest);
/*    e.waitUntil(
        caches.open(CACHE_NAME)
            // add files to cache
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
            .catch(function (error) {
                console.log(error);
            })
    );
*/
});

self.addEventListener('activate', async e => {
    // console.info('activate event detected');
    const keys = await caches.keys();
    await Promise.all(
      keys.map(key => key !== version && caches.delete(key))
    );
    /*
    e.waitUntil(
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
    */
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

self.addEventListener('fetch', async function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function(err) {
        // If both fail, show a generic fallback:
        return caches.match('./index.htm');
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