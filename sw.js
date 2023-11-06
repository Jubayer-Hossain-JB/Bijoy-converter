self.addEventListener('fetch', event=>{
  event.respondWith(
    fetch(event.request)
    .then(res=>{
      var resClone = res.clone()
      caches
      .open('website-cache')
      .then(cache=>cache.put(event.request, resClone))
      return res
    })
    .catch(_=>caches.match(event.request))
  )
})
