if ("serviceWorker" in navigator) {
window.addEventListener("load", () => {
navigator.serviceWorker
.register("sw.js")
.then(reg => console.log("Service Worker registrado"))
.catch(err => console.log("Error:", err));
});
}

const buscador = document.getElementById("buscar");

buscador.addEventListener("keyup", () => {

const filtro = buscador.value.toLowerCase();
const productos = document.querySelectorAll(".producto");

productos.forEach(producto => {

const nombre = producto.querySelector("h2").textContent.toLowerCase();

if(nombre.includes(filtro)){
producto.style.display = "block";
}else{
producto.style.display = "none";
}

});

});


const banner = document.getElementById("offline-banner");

function actualizarEstadoConexion() {

if (!navigator.onLine) {
banner.style.display = "block";
} else {
banner.style.display = "none";
}

}

window.addEventListener("online", actualizarEstadoConexion);
window.addEventListener("offline", actualizarEstadoConexion);

actualizarEstadoConexion();