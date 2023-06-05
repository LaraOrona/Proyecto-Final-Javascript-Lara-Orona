

class ProductoLS {
    constructor(nombre, precio, descripcion, id, cantidad, img) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.descripcion = descripcion;
        this.id = Number(id);
        this.cantidad = Number(cantidad);
        this.img = img;
    }

}


let total = 0


/////////JSON//////////




let tienda = document.getElementById("tienda"); 

let verCarrito = document.getElementById("verCarrito");

let modalContainer = document.getElementById("modal-container")

let catalogo = []

let carrito = []; 



fetch ("./js/productos.json")
  .then((res)=>res.json())
  .then((data)=>{
    catalogo = [...data]
    data.forEach((producto) => {     
    
    let content = document.createElement("div"); 
    content.innerHTML = `<img class="tamaño" src="./assets/img/${producto.img}" > 
                    <h3> Producto: ${producto.descripcion} </h3> 
                    <p> Precio: ${producto.precio} </p> 
                    <input id = "${producto.id}"type="number" name="cant" size="0" required placeholder="Ingrese cantidad">                    

                    `; 
    content.className = "d-flex card col-4 justify-content-center" 
    tienda.append(content); 
    let comprar = document.createElement("button"); 
    comprar.innerText ="Agregar al carrito"; 
    comprar.className="comprar" 
    content.append(comprar); 


    comprar.addEventListener("click",() =>  { 

   
        if ($(`#${producto.id}`).val() == " "){
            $(`#${producto.id}`).val(1);
        }
              
                carrito.push({nombre: producto.nombre,
                   precio: producto.precio*$(`#${producto.id}`).val(),
                   descripcion: producto.descripcion,
                   id: producto.id,
                   cantidad: $(`#${producto.id}`).val(),
                   img: producto.img}); 
                console.log(carrito);         

   
            const lsCarrito = new ProductoLS (producto.nombre, producto.precio*$(`#${producto.id}`).val(), producto.descripcion, producto.id, $(`#${producto.id}`).val(), producto.img); 


            const jsonCarrito = JSON.parse(localStorage.getItem(producto.nombre));

            if (jsonCarrito) {
                lsCarrito.cantidad += jsonCarrito.cantidad
                lsCarrito.precio += jsonCarrito.precio
            }

         const enJson = JSON.stringify(lsCarrito)
            localStorage.setItem(producto.nombre,enJson)
  

    }); 

})})

// let verCarrito = document.getElementById("verCarrito");
// verCarrito.addEventListener("click", () => {
    $("#verCarrito").on("click", () => {
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
//-------------------Mitad carrito---------------------------------------------///
    let lsCarrito = [];
    let i = 0;
    catalogo.forEach((producto) => {
        const localcarrito =  JSON.parse(localStorage.getItem(producto.nombre));
        if(localcarrito){
            lsCarrito.push(localcarrito)
            console.log(lsCarrito); 
// carritoLS.cantidad += localcarrito.cantidad;
 // carritoLS.precio += localcarrito.precio;
 // total += localcarrito.precio

    let extraer = lsCarrito [i];
    i++;
            
    let carritoContenido = document.createElement("div");
    carritoContenido.id = extraer.nombre + "X";
    carritoContenido.className = "modal-content";
    carritoContenido.innerHTML = `
    <img class="tamaño" src="./assets/img/${extraer.img}">
    <h3> Producto: ${extraer.descripcion} </h3>
    <p> Precio: ${extraer.precio} $</p>
    <p> Cantidad: ${extraer.cantidad} </p>
    `;

    modalContainer.append(carritoContenido);
    
    


        const boton = document.createElement("h1");
        boton.innerText = "X";
        boton.className = "boton-x";
        boton.id = extraer.id + "X";
        boton.addEventListener ("click", () =>{
            
            
            // const deletecarrito = document.getElementById(extraer.nombre + "X");
            // deletecarrito.remove();
            $(`#${extraer.nombre}X`).remove();

            // const deleteX = document.getElementById(extraer.id + "X");
            // deleteX.remove();
            $(`#${extraer.id}X`).remove
            localStorage.removeItem(extraer.nombre);

            const total1local = localStorage.getItem("total");
            const total2 = document.getElementById("compratotal")
            total2.innerHTML = `Total de la compra: $ ${total1local - extraer.precio}
            `
            localStorage.setItem("total",total1local - extraer.precio)

        })
        carritoContenido.append(boton);
    
    }});
      
    const total3 = lsCarrito.reduce((acc,catalogo) => acc + catalogo.precio,0);

    const comprasT = document.createElement("div");
    comprasT.innerHTML = `Total de la compra: $ ${total3}
    ` 
    comprasT.id = "compratotal"

    const boton2 = document.createElement("button");
    boton2.innerText = "Finalizar Compra"
    boton2.id = "myBtn"
    boton2.className = "btn "
    boton2.addEventListener('click', () => {

        lsCarrito.forEach(el => {
            localStorage.removeItem(el.nombre)
        });

        Swal.fire({
            title: 'Genial!',
                text: 'Has finalizado tu compra ',
                
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 2100,
                showConfirmButton: false
            
            })

        const cerrar = document.getElementById("modal-container");
        cerrar.style.display = "none";
        })

        modalContainer.append(comprasT);
        modalContainer.append(boton2);
        localStorage.setItem("total",total3)
});