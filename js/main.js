
class Producto {
    constructor(nombre, precio, descripcion, id, cantidad, img) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.descripcion = descripcion.toLowerCase();
        this.id = Number(id);
        this.stock = true;
        this.cantidad = Number(cantidad);
        this.img = img;

}}


let total = 0

const catalogo = [
    new Producto ("taza",1500,"Taza Ardilla Negra",1,0,"producto1.jpg"),
    new Producto ("remera",3000,"Remera Ardilla Blanca",2,0,"producto2.png"),
    new Producto ("remera2",3000,"Remera Ardilla Negra",3,0,"producto3.jpg"),
    new Producto ("llavero",1000,"Llavero Ardilla Tela",4,0,"producto4.jpg"),
    new Producto ("llavero2",1000,"Llavero Ardilla Feliz",5,0,"producto5.jpg"),
    new Producto ("taza2",1500,"Taza Ardilla Blanca",6,0,"producto6.jpg"),

]



let tienda = document.getElementById("tienda"); 

let verCarrito = document.getElementById("verCarrito");

let modalContainer = document.getElementById("modal-container")


for (const producto of catalogo) { 
    
    
    let content = document.createElement("div"); 
    content.innerHTML = `<img src="./assets/img/${producto.img}" > 
                    <h3> Producto: ${producto.descripcion} </h3> 
                    <p> Precio: ${producto.precio} </p> 
                    <input id = "${producto.nombre}input" type="number">

                    `; 
    content.className = "card col-4 p-3" 
    tienda.append(content); 
    let comprar = document.createElement("button"); 
    comprar.innerText ="Agregar al carrito"; 
    comprar.className="comprar" 
    content.append(comprar); 

    let carrito = []; 

    comprar.addEventListener("click",() => { 
        carrito.push({id: producto.id,  
                nombre: producto.nombre, 
                descripcion: producto.descripcion,
                precio: producto.precio, 
                img: producto.img}); 
                console.log(carrito);
            let cantidad = document.getElementById(producto.nombre+"input"); 
            if(cantidad.value == 0){
                cantidad.value = 1} 
            
            producto.cantidad = cantidad.value 
            producto.precio = producto.precio * producto.cantidad

        localStorage.setItem(producto.nombre,JSON.stringify({id,nombre,precio,img,cantidad}=producto) ); 

    }); 

}


verCarrito.addEventListener("click", () => {
    total = 0
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-tltle">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton =document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click",() => {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalbutton);


    catalogo.forEach((producto) => {
        const localcarrito =  JSON.parse(localStorage.getItem(producto.nombre));
        if(localcarrito){
            // carritoLS.cantidad += localcarrito.cantidad;
            // carritoLS.precio += localcarrito.precio;
            total += localcarrito.precio

    
    let carritoContenido = document.createElement("div");
    carritoContenido.className = "modal-content";
    carritoContenido.innerHTML = `
    <img class="tamaño" src="./assets/img/${localcarrito.img}">
    <h3> Producto: ${localcarrito.descripcion} </h3>
    <p> Precio: ${localcarrito.precio} $</p>
    <p> Cantidad: ${localcarrito.cantidad} </p>
    `;

    modalContainer.append(carritoContenido)
    }});  


    const totalCompra = document.createElement("div")
    totalCompra.className = "total-contenido"
    totalCompra.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalCompra);

    localStorage.setItem("total",total)
});
