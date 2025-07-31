const CACHE_NAME = 'voice-app-cache-v1';
const PRECACHE_ASSETS = [
  '/models/whisper.bin',
  '/models/tts-model.bin',
  '/',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedRes) => {
      return cachedRes || fetch(e.request);
    })
  );
});
