/* Carron PWA service worker.
 * Network-first for GET navigations/assets with a cache fallback (so the app
 * shell opens offline); the /api/* endpoints and any non-GET request are always
 * passed straight to the network and never cached. */
const CACHE = "carron-v1";
const SHELL = [
  "/tools/",
  "/90-day-test/",
  "/health-check/",
  "/find-your-fit/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/images/carron-logo-horizontal-white.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // Never touch the API or non-GET (payments, lead posts, report reads).
  if (req.method !== "GET" || url.pathname.startsWith("/api/")) return;
  // Only handle same-origin GETs.
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("/tools/")))
  );
});
