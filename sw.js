/* Write It Well service worker – lets the site work offline and load instantly.
   build.py fills in VERSION, so every rebuild makes phones fetch the new site. */
const VERSION = "e71b897283ee";
const CORE = "wiw-core-" + VERSION;
const RUNTIME = "wiw-runtime";
const CORE_FILES = ["/", "/index.html", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(CORE_FILES)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("wiw-core-") && k !== CORE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // The page itself: use the copy saved with this version (fast, works offline).
  if (req.mode === "navigate" && url.origin === location.origin) {
    e.respondWith(caches.open(CORE).then(c => c.match("/index.html")).then(r => r || fetch(req)).catch(() => fetch(req)));
    return;
  }
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
    return;
  }
  // Fonts and the pinyin library: use the saved copy, refresh it in the background.
  if (/fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net/.test(url.hostname)) {
    e.respondWith(caches.open(RUNTIME).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
