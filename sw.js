// ════════════════════════════════════════════════════════════════════════
//  Plattform-Service-Worker – MHH Neurologie · Tools
//  Variante B: EIN Mechanismus für alle Module (Launcher + ASM + ICANS …).
//  Registriert am Wurzel-Scope, kontrolliert damit auch asm.html / icans.html.
//  Strategie:
//    • App-Shell (Launcher + Module)  → Cache-First + Hintergrund-Refresh
//    • CDN-Bibliotheken               → Cache-First mit Netzwerk-Fallback
//    • Alles andere                   → Network-First mit Cache-Fallback
//  Version: 1.0
// ════════════════════════════════════════════════════════════════════════

var CACHE_VERSION = 'neuro-platform-v8.9';
var CACHE_CDN     = 'neuro-platform-cdn-v8.9';

// ── App-Shell: Launcher + alle Modul-Dokumente + Assets ─────────────────
var APP_SHELL = [
  './',
  './index.html',            // Launcher (Ebene 1)
  './manifest.json',
  // Geteilte Dienste (Ebene 2)
  './kontakte.html',
 './neuroimmun.html',
  './neuroimmun-data.js',
  './neuroimmun-manifest.json',
  './icons/neuroimmun-icon-192.png',
  './icons/neuroimmun-icon-512.png',

  './contacts.js',
  // Module (Ebene 3) – unveränderte, eigenständige Dokumente
  './asm.html',
  './asm-manifest.json',
  './icans.html',
  './icans-manifest.json',
  './stroke.html',
  './stroke-manifest.json',
  './stroke-data.js',
  './stroke-paed.js',
  './platform-chrome.js',
  './platform-a11y.js',
  './platform-theme.js',
  './platform-viewmode.js',
  './stroke-ui.js',
  './stroke-data.json',
  // Icons
  './icons/platform-icon-192.png',
  './icons/platform-icon-180.png',
  './icons/platform-icon-maskable-192.png',
  './icons/platform-icon-maskable-512.png',
  './icons/platform-icon-512.png',
  './icons/asm-icon-192.png',
  './icons/asm-icon-512.png',
  './icons/icans-icon-192.png',
  './icons/icans-icon-512.png',
  './icons/icans-banner.png',
  './icons/stroke-icon-192.png',
  './icons/stroke-icon-512.png'
];

// ── CDN-Bibliotheken: Vereinigung des Bedarfs ALLER Module ──────────────
//   ASM   → jsPDF
//   ICANS → jsPDF, Chart.js, qrcodejs, jsQR
var CDN_LIBS = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'
];

// ════════════════════════════════════════════════════════════════════════
//  INSTALL – App-Shell sofort cachen, CDN im Hintergrund
// ════════════════════════════════════════════════════════════════════════
self.addEventListener('install', function(event) {
  console.log('[SW] Install ' + CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function(cache) {
        // Einzeln cachen, damit ein Fehler nicht alles blockiert
        return Promise.all(APP_SHELL.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.warn('[SW] Shell-Cache fehlgeschlagen:', url, err);
          });
        }));
      })
      .then(function() {
        caches.open(CACHE_CDN).then(function(cache) {
          CDN_LIBS.forEach(function(url) {
            fetch(url, { mode: 'cors' })
              .then(function(res) { if (res.ok) { cache.put(url, res); } })
              .catch(function() { console.warn('[SW] CDN offline, später:', url.split('/').pop()); });
          });
        });
      })
      .then(function() { return self.skipWaiting(); })
  );
});

// ════════════════════════════════════════════════════════════════════════
//  ACTIVATE – nur fremde Plattform-Caches aufräumen
// ════════════════════════════════════════════════════════════════════════
self.addEventListener('activate', function(event) {
  console.log('[SW] Activate ' + CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(name) {
        if (name !== CACHE_VERSION && name !== CACHE_CDN) {
          console.log('[SW] Alter Cache gelöscht:', name);
          return caches.delete(name);
        }
      }));
    }).then(function() { return self.clients.claim(); })
  );
});

// ════════════════════════════════════════════════════════════════════════
//  FETCH
// ════════════════════════════════════════════════════════════════════════
self.addEventListener('fetch', function(event) {
  var url = event.request.url;
  if (event.request.method !== 'GET') return;
  if (url.indexOf('sw.js') !== -1) return;               // SW nie cachen

  if (isAppShell(url)) {
    event.respondWith(cacheFirstWithRefresh(event.request, CACHE_VERSION));
    return;
  }
  if (isCDN(url)) {
    event.respondWith(cacheFirstWithFallback(event.request, CACHE_CDN));
    return;
  }
  event.respondWith(networkFirstWithCache(event.request, CACHE_VERSION));
});

// ════════════════════════════════════════════════════════════════════════
//  STRATEGIEN
// ════════════════════════════════════════════════════════════════════════
function cacheFirstWithRefresh(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(cached) {
      var net = fetch(request).then(function(res) {
        if (res && res.ok) { cache.put(request, res.clone()); }
        return res;
      }).catch(function() { /* offline – Cache reicht */ });
      return cached || net;
    });
  });
}

function cacheFirstWithFallback(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(cached) {
      if (cached) return cached;
      return fetch(request, { mode: 'cors' }).then(function(res) {
        if (res && res.ok) { cache.put(request, res.clone()); }
        return res;
      }).catch(function() {
        return new Response('/* offline */', { headers: { 'Content-Type': 'application/javascript' } });
      });
    });
  });
}

function networkFirstWithCache(request, cacheName) {
  return fetch(request).then(function(res) {
    if (res && res.ok) {
      var clone = res.clone();
      caches.open(cacheName).then(function(cache) { cache.put(request, clone); });
    }
    return res;
  }).catch(function() {
    return caches.match(request).then(function(cached) {
      return cached || new Response('Offline – Ressource nicht gecacht.', {
        status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    });
  });
}

// ════════════════════════════════════════════════════════════════════════
//  HILFSFUNKTIONEN
// ════════════════════════════════════════════════════════════════════════
function isAppShell(url) {
  var origin = self.location.origin;
  if (url.indexOf(origin) !== 0) return false;
  var path = url.replace(origin, '').split('?')[0];
  return APP_SHELL.some(function(s) {
    var norm = s.replace(/^\.\//, '/');
    return path === norm || path.endsWith(norm);
  });
}

function isCDN(url) {
  var hosts = ['cdnjs.cloudflare.com','cdn.jsdelivr.net','unpkg.com','fonts.googleapis.com','fonts.gstatic.com'];
  return hosts.some(function(h) { return url.indexOf(h) !== -1; });
}

// ════════════════════════════════════════════════════════════════════════
//  MESSAGE – Cache-Kontrolle aus der App
// ════════════════════════════════════════════════════════════════════════
self.addEventListener('message', function(event) {
  if (!event.data) return;
  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'GET_CACHE_SIZE':
      Promise.all([caches.open(CACHE_VERSION), caches.open(CACHE_CDN)])
        .then(function(cs) { return Promise.all(cs.map(function(c){ return c.keys(); })); })
        .then(function(keyArrs) {
          var total = keyArrs.reduce(function(s,k){ return s + k.length; }, 0);
          event.source.postMessage({ type: 'CACHE_SIZE', count: total });
        });
      break;
    case 'CLEAR_CACHE':
      caches.keys().then(function(names) {
        return Promise.all(names.map(function(n){ return caches.delete(n); }));
      }).then(function() { event.source.postMessage({ type: 'CACHE_CLEARED' }); });
      break;
  }
});
