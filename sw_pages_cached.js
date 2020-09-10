const cachesession = 'se1';


const cacheAssets = [
'index.html',
'style.css',
'app.js'
];
 

//Installer
self.addEventListener('install', v => {
	console.log('Service Worker: Installed')
	v.waitUntil(
		caches
			.open(cachesession)
			.then(cache => {
				console.log('Service Worker: Caching Files....');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
	);
});

//Activating:
self.addEventListener('activate', v => {
	console.log('Service Worker: Activated')
//Remove other caches:
	v.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cachesession){
						console.log('Service Worker: Clearing old cache');
						return caches.delete(cache);
					}
				})
			)
		})
	);
})

//Show old files via fetch:
self.addEventListener('fetch', v => {
	console.log('Service Worker: Fetching');
	v.respondWith(
		fetch(v.request).catch(() => caches.match(v.request)));
})