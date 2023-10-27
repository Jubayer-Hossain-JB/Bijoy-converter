self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open('website-cache')
      .then((cache) =>{
        cache.addAll([
          '/Bijoy-converter/',
          '/Bijoy-converter/index.html',
          '/Bijoy-converter/style.css',
          '/Bijoy-converter/script.js',
          "/Bijoy-converter/icon.svg",
          "/Bijoy-converter/key.json",
          "/Bijoy-converter/sutonny.ttf",
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
          "https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&family=Noto+Sans+Bengali&display=swap",

        ])
      }
      ),
  );
});



self.addEventListener('fetch', event=>{
  event.respondWith(
    fetch(event.request)
    .catch(_=>caches.match(event.request))
  )
})

