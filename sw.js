const staticMortgage = "mortgage-calc"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/index.js",
    "/icons/iconx144.png"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticMortgage).then(cache => {
            cache.addAll(assets)
        })
    )
})
self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        try {
            var res = await fetch(event.request);
            var cache = await caches.open('cache');
            cache.put(event.request.url, res.clone());
            return res;
        }
        catch (error) {
            return caches.match(event.request);
        }
    }());
});
