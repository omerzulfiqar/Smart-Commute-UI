importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
importScripts('https://ocdn.eu/weather/pwa/workbox-sw.prod.v1.0.0.js');

const cacheName = 'articles-cache';


//open notification link after click on system notification
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.click_action));
});

//configure workbox to serve content using the same cache as backgroundNotificationHandler
const workboxSW = new WorkboxSW();
workboxSW.router.registerRoute(
  /.*/,
  workboxSW.strategies.networkFirst({
    cacheName: cacheName,
    cacheExpiration: {
      maxEntries: 50,
      maxAgeSeconds: 2 * 24 * 60 * 60,
      networkTimeoutSeconds: 8
    }
  })
);

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());