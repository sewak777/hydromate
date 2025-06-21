// Service Worker for enhanced notifications
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Handle notification action clicks
  if (event.action === 'log-250') {
    // Open app and trigger 250ml log
    event.waitUntil(
      clients.openWindow('/?action=log-250')
    );
  } else if (event.action === 'log-500') {
    // Open app and trigger 500ml log
    event.waitUntil(
      clients.openWindow('/?action=log-500')
    );
  } else if (event.action === 'log-water') {
    // Open app and trigger water log
    event.waitUntil(
      clients.openWindow('/?action=log-water')
    );
  } else {
    // Default click - just open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle push notifications (for future web push implementation)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-16x16.png',
      vibrate: [200, 100, 200],
      data: data,
      actions: [
        {
          action: 'log-water',
          title: 'Log Water'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});