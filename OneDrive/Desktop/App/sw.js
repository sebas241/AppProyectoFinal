const CACHE_NAME = "sombreros-app-shell-v1";

const APP_SHELL = [
"/",
"index.html",
"styles.css",
"app.js",
"manifest.json",
"assets/icono.png",
"assets/sombrero1.jpg",
"assets/sombrero2.jpg",
"assets/sombrero3.jpg",
"assets/sombrero4.jpg",
"assets/sombrero5.jpg",
"assets/sombrero6.jpg",
"assets/sombrero7.jpg",
"assets/sombrero8.jpg"
];


self.addEventListener("install", event => {

console.log("Service Worker instalado");

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {

console.log("Guardando App Shell");

return cache.addAll(APP_SHELL);

})

);

});

self.addEventListener("activate", event => {

console.log("Service Worker activado");

event.waitUntil(

caches.keys().then(cacheNames => {

return Promise.all(

cacheNames.map(cache => {

if(cache !== CACHE_NAME){
console.log("Eliminando cache antigua");
return caches.delete(cache);
}

})

);

})

);

});



self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => {

if(response){
return response; 
}

return fetch(event.request)
.then(networkResponse => {

return caches.open(CACHE_NAME)
.then(cache => {

cache.put(event.request, networkResponse.clone());
return networkResponse;

});

})

.catch(() => {

if(event.request.destination === "image"){
return caches.match("assets/icono.png");
}

});

})

);

});