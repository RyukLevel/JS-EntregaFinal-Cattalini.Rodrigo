const productos = [];
// const productos = [
//   {ID: "Cod: 1", nombre: "PALETA PADEL SOLA BELGIQUE", precio: 140000, imagen: "assets/productos/paleta1.png"},
//   {ID: "Cod: 2", nombre: "PALETA PADEL STEEL CUSTOM W", precio: 150000, imagen: "assets/productos/paleta2.png"},
//   {ID: "Cod: 3", nombre: "PALETA PADEL STEEL CUSTOM DARK", precio: 154000, imagen: "assets/productos/paleta3.png"},
//   {ID: "Cod: 4", nombre: "PALETA PADEL COAST MAGNA FULL", precio: 180500, imagen: "assets/productos/paleta4.png"},
//   {ID: "Cod: 5", nombre: "PALETA ROYAL PADEL ANIVERSARIO", precio: 320000, imagen: "assets/productos/paleta5.png"},
//   {ID: "Cod: 6", nombre: "PALETA PADEL URICH IRON", precio: 457500, imagen: "assets/productos/paleta6.png"},
//   {ID: "Cod: 7", nombre: "PALETA PADEL CLASS ONE", precio: 135500, imagen: "assets/productos/paleta7.png"},
//   {ID: "Cod: 8", nombre: "PALETA PADEL VAIRO BLCK CARBON", precio: 146800, imagen: "assets/productos/paleta8.png"},  
// ];

//Traer archivos JSON
const URL = "basedatos.json";
async function obtenerProductos() {
    try {
        const response = await fetch(URL);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            productos.push(...data);
            console.log (productos)
        } else {
            throw new Error("No se pudo cargar los productos");
        }
        cargarProductosHTML();
    } catch (error) {
        contenedor.innerHTML = retornarCardError();
        console.error(error);
        console.log("sefsd");
    }
}
obtenerProductos()


const botonesAgregar = document.querySelectorAll(".añadir-producto");
const botonesAgregar2 = document.querySelectorAll(".agregarCarrito");
const botonesAgregar4 = document.querySelectorAll(".eliminar");
const elemento7 = document.getElementById (".eliminar")
const botonesAgregar5 = document.querySelectorAll(".recuperar");
const campoCodigo = document.getElementById ("keyproducto");
const campoProducto = document.getElementById ("producto");
const campoCantidad = document.getElementById ("cantidadproducto");
const campoPrecio = document.getElementById ("precio");
const campoTotal = document.getElementById ("total");
const elemento1 = document.getElementById ("elmentoOculto1")
const elemento2 = document.getElementById ("elmentoOculto2")
const elemento3 = document.getElementById ("elmentoOculto3")
const elemento4 = document.getElementById ("elmentoOculto4")
const elemento5 = document.getElementById ("elmentoOculto5")
const elemento6 = document.getElementById ("elmentoOculto6")
const cantidadCarrito = document.getElementById ("cantidad")
const msjError = document.getElementById ("mjeSeleccionarProducto")
const productoAgregado = []

// Función que selecciona el ID de producto y detalla el producto seleccionado
function seleccionProducto () {
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {
      const producto = this.parentNode;
      const idproducto = producto.querySelector(".codigoid").textContent;
      console.log (idproducto)         
      productoCapturado = idproducto;   
      const arrayProducto = productos.find (producto => producto.ID === productoCapturado)
      console.log (producto.ID)
      console.log(productoCapturado)  
const codigoProducto = arrayProducto.ID
const nombreProducto = arrayProducto.nombre
const precioProducto = arrayProducto.precio
campoCodigo.innerHTML = codigoProducto;     
campoProducto.innerHTML = nombreProducto;
campoPrecio.innerHTML = "$ "+precioProducto;
msjError.innerHTML = "";
campoCantidad.value = 1;
})
})
}


// Funcion para disponibilizar los productos en HTML una vez obtenido de JSON
function cargarProductosHTML(){
// Creción de grilla para mostrar productos.
const contenedor = document.getElementById("grilla");
for (let i = 0; i < productos.length; i++) {
  const fila = document.createElement("div");
  fila.classList.add("fila");
  contenedor.appendChild(fila);

  for (let j = 0; j < 1; j++) {
    const columna = document.createElement("div");
    columna.classList.add("columna");
    fila.appendChild(columna);
  }
}
// Agregar productos en la grilla.
const filas = document.querySelectorAll(".fila");

for (let i = 0; i < filas.length; i++) {
  const columnas = filas[i].querySelectorAll(".columna");

  for (let j = 0; j < columnas.length; j++) {
    const producto = productos[i + j];
    columnas[j].innerHTML = `    
      <img src="${producto.imagen}"/>
      <p class="codigoid">${producto.ID}</p>
      <h3>${producto.nombre}</h3>
      <p>${producto.precio}</p>
      <p class="añadir-producto" onclick="saludar()">Seleccionar artículo</p>     
    `   
    ;    
  }  
}
}

function saludar(){
  
}

// Función que agrega producto al carrito
function agregarCarrito () {
  botonesAgregar2.forEach(boton => {
  boton.addEventListener("click", function() {    
    const idproducto = campoCodigo.textContent;
    const cantidadProducto = campoCantidad.value;           
    productoCapturado = idproducto;  
const arrayProducto = productos.find (producto => producto.ID === productoCapturado)
if (arrayProducto === undefined){
  msjError.innerHTML = "Debe seleccionar un producto";
}else{
const ID = arrayProducto.ID
const nombre = arrayProducto.nombre
const precio = arrayProducto.precio
productoAgregado.push
({ID,
  nombre,
  cantidadProducto,
  precio});
cantidadCarrito.innerHTML = "Producto/s en carrito: "+totalCantidad();
vaciarSeleccion()
localStorageCarrito()
reseteoCantidad()
agregarProductosTabla(productos)
totalCompra ()
campoCantidad.value = "";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,  
  timer: 2000,
  timerProgressBar: true,
  // didOpen: (toast) => {
  //   toast.onmouseenter = Swal.stopTimer;
  //   toast.onmouseleave = Swal.resumeTimer;
  // }
});
Toast.fire({
  icon: "success",
  title: "Producto agregado"
});
}
}) 
})
}

//Funcion para saber el total de la compra

function totalCompra (){
  let total = 0  
  for (const producto of productoAgregado) {
    const precio = producto.precio;
    const cantidad = producto.cantidadProducto;

    total += precio * cantidad;
  }
  return total
}


function totalCantidad (){
  let totalCan = 0
    for (const producto of productoAgregado) {    
    const cantidad = producto.cantidadProducto;
    const fictio = 1;

    totalCan += cantidad*fictio;
  }
  return totalCan
}


// Funcion para agregar los productos en una tabla detallada.
function agregarProductosTabla(productos) {
  const tbody = document.querySelector("tbody");
  if(productoAgregado.length === 0){

  }else{
  // elemento1.style.display = "inline";
  // elemento2.style.display = "inline";
  // elemento3.style.display = "inline";
  // elemento4.style.display = "inline"
  elemento5.style.display = "inline";
  // elemento6.style.display = "inline";  
campoTotal.innerHTML = "$ "+totalCompra();
msjError.innerHTML = "";
}
  limpiarTabla()  
  vaciarSeleccion()    

  for (const producto of productoAgregado) {
    const fila = document.createElement("tr");

    const celdaCodigo = document.createElement("td");
    celdaCodigo.textContent = producto.ID;

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = producto.nombre;

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = "$ "+producto.precio;

    const celdaCantidad = document.createElement("td");
    celdaCantidad.textContent = producto.cantidadProducto;

    const celdaSubTotal = document.createElement("td");
    celdaSubTotal.textContent = "$ "+producto.precio*producto.cantidadProducto;

    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaSubTotal);
    tbody.appendChild(fila);
  }
}


function reseteoCantidad(){
  campoCantidad.value = 1
}


  //Funcion para resetear la tabla a cero, ya que el mostrar carrito toma todo los datos del array de agregar productos
  function limpiarTablaFull() {
    const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Vacía el contenido del tbody
        const td = document.getElementsByTagName("td");
        td.innerHTML = "";
        elemento1.style.display = "none";
        elemento2.style.display = "none";
        elemento3.style.display = "none";
        elemento4.style.display = "none";  
        elemento5.style.display = "none";
        elemento6.style.display = "none";
  }

  //Funcion para resetear la tabla a cero, dejando los encabezados.
  function limpiarTabla() {
    const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Vacía el contenido del tbody
        const td = document.getElementsByTagName("td");
        td.innerHTML = "";         
  }

  //Funcion para dejar en 0 el contador de productos
  function limpiarContador(){
    cantidadCarrito.innerHTML = "";
  }

  //Funcion para resetear el array del carrito a cero.
  function vaciarCarrito() {
    botonesAgregar4.forEach(boton => {
      boton.addEventListener("click", function() {    
        if (productoAgregado.length === 0){
          msjError.innerHTML = "Tu carrito se encuentra vacío";
          localStorage.clear()
          vaciarSeleccion()
          campoCantidad.value = "";
        }else{
        productoAgregado.splice(0, 100);
        vaciarSeleccion()
        limpiarTabla()
        limpiarContador()
        limpiarTablaFull()        
        localStorage.clear()
        campoTotal.innerHTML = ""
        msjError.innerHTML = "";
        campoCantidad.value = "";
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,  
          timer: 2000,
          timerProgressBar: true,
          // didOpen: (toast) => {
          //   toast.onmouseenter = Swal.stopTimer;
          //   toast.onmouseleave = Swal.resumeTimer;
          // }
        });
        Toast.fire({
          icon: "warning",
          title: "Carrito vacío"
        });
      }
    })
  })
  }

  function vaciarSeleccion(){
    campoCodigo.innerHTML = "";     
    campoProducto.innerHTML = "";
    campoPrecio.innerHTML = "";  
    campoCantidad.innerHTML = "";    
  }

  //Guardar carrito en localstorage hasta que el usuario elimine el carrito
  function guardarLocalStorage(){

  }

function localStorageCarrito(){
  const productoGuardado = productoAgregado 
  const productoJSON = JSON.stringify(productoGuardado);
  localStorage.setItem("usuarioCarrito", productoJSON);
}

seleccionProducto ()
agregarCarrito ()
vaciarCarrito()



