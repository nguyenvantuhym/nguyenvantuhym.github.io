/* times 4 */
// Load the sw-toolbox library.
importScripts('./js/idb-keyval.js');

var cacheName = 'times4';
const offlineUrl = 'offline.htm'; /* times2 */


// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(  [
      './js/main.js',
      './js/article.js',
      './images/newspaper.svg',
      './css/site.css',
      './backend/latest.json',
      './backend/data-1.json',
      './article.htm',
      './index.htm',
		/* times2 */
		offlineUrl,
		'../../animation/demo/Bai 4_files/jump0.gif',
		'../../animation/demo/Bai 4_files/jump1.gif',
		'../../animation/demo/Bai 4_files/jump2.gif',
		'../../animation/demo/Bai 4_files/jump3.gif'
    ])) 
  );
});

/* times 3 */
function timeout(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(new Response('', {
        status: 408,
        statusText: 'Request timed out.'
      }));
    }, delay);
  });
}

// Cache any new resources as they are fetched
self.addEventListener('fetch', function(event) {
 // Check for the googleapis domain
/* times 3 */
  if (/^https:\/\/fonts\.googleapis\.com\/.*$/.test(event.request.url) ||
	  /^https:\/\/fonts\.gstatic\.com\/.*$/.test(event.request.url)
	) {
	console.log(event.request.url);
    return event.respondWith(Promise.race([timeout(3000),fetch(event.request.url)]));
  }

  // Else process all other requests as expected
  return event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }

          var responseToCache = response.clone();
          caches.open(cacheName)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      )
		/* times2 */
		.catch(function (error) {
          	if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
          		return caches.match(offlineUrl);
        	}
        });
    })
  );
});


/* times 4 */
// The sync event for the contact form
self.addEventListener('sync', function (event) {
  if (event.tag === 'contact-email') {
    event.waitUntil(
      idbKeyval.get('sendMessage').then(value =>
        fetch('./sendMessage/', {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify(value)
        })));

        // Remove the value from the DB
      //  idbKeyval.delete('sendMessage');
		console.log("Message  sent ");
    }
});
