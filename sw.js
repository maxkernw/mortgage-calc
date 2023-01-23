const staticMortgage = "mortgage-calc-v1"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/index.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticMortgage).then(cache => {
            cache.addAll(assets)
        })
    )
})