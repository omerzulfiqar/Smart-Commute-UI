self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install');
});
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});
self.addEventListener('fetch', event => {
console.log('[ServiceWorker] fetch', event.request);
});
self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;
    const link = notification.data.link;
    if (action !== 'close') {
      if (link) {
        clients.openWindow(link);
      }
    }
    notification.close();
    console.log('notificationclick action is', action);
  })
  