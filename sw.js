self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open('website-cache')
      .then((cache) =>{
        cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          "/icon.svg",
          "/key.json",
          "/sutonny.ttf",
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
          "https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&family=Noto+Sans+Bengali&display=swap",

        ])
      }
      ),
  );
});


if(!navigator.onLine){
  self.addEventListener('fetch', event => {
      // Check if the requested file is in the cache.
      fetch(event.request).then(updated=>{
        
        if(updated.ok){
          event.respondWith(updated)
        }else{
          event.respondWith(caches.match(event.request))
        }
        // event.respondWith(caches.match(event.request));
      });
    })
}
