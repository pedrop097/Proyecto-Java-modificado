let carritodeCompras = []


const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecDescripcion = document.getElementById('selecDescripcion');
const buscador = document.getElementById('search');


let stockProductos;
fetch('stock.json')
    .then((resp) => resp.json())
    .then((data) => stockProductos = data)

function mostrarProductos() {
    fetch('stock.json')
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">${item.descripcion}</p>
                <p> ${item.tipo}</p>
                <p> $${item.precio}</p>
                   <a id="agregar${item.id}" class="btn btn-primary">Añadir</a>
                
            </div>
            </div>
            `
                contenedorProductos.appendChild(div);

                let btnAgregar = document.getElementById(`agregar${item.id}`)
                btnAgregar.addEventListener('click', () => {
                    agregarAlCarrito(item.id)

                })
            })
        })
}
mostrarProductos()

function agregarAlCarrito(id) {
    let productosUnd = carritodeCompras.find(item => item.id == id)
    if (productosUnd) {
        productosUnd.cantidad = productosUnd.cantidad + 1
        document.getElementById(`und${productosUnd.id}`).innerHTML = ` <p id=und:${productosUnd.id}>Und:${productosUnd.cantidad} </p>`
        actualizarCarrito()
    } else {
        let productoAgregar = stockProductos.find(elemento => elemento.id == id)
        productoAgregar.cantidad = 1

        carritodeCompras.push(productoAgregar)

        actualizarCarrito()

        mostrarCarrito(productoAgregar)
    }
    localStorage.setItem('carrito', JSON.stringify(carritodeCompras))
}

function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML = `
                    <p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="und${productoAgregar.id}">Und: ${productoAgregar.cantidad}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="btn">x</i></button>`


    contenedorCarrito.appendChild(div)
    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    btnEliminar.addEventListener('click', () => {



        Swal.fire({

            title: `Estas seguro que quieres borrar a ${productoAgregar.nombre}`,

            icon: "warning",

            Text: `El producto: ${productoAgregar.nombre} sera eliminado del carrito de compras`,

            showCancelButton: true,

            confirmButtonText: "Si, quiero borrar",

            cancelButtonText: "No, quiero borrar",

        }).then((result) => {



            if ((result.isConfirmed) && (productoAgregar.cantidad == 1)) {

                btnEliminar.parentElement.remove()

                carritodeCompras = carritodeCompras.filter(item => item.id != productoAgregar.id)

                actualizarCarrito()

                localStorage.setItem('carrito', JSON.stringify(carritodeCompras))

            } else {

                productoAgregar.cantidad = productoAgregar.cantidad - 1

                document.getElementById(`und${productoAgregar.id}`).innerHTML = ` <p id=und:${productoAgregar.id}>Und:${productoAgregar.cantidad} </p>`

                actualizarCarrito()

                localStorage.setItem('carrito', JSON.stringify(carritodeCompras))

            }

        })

    })


}
function actualizarCarrito() {
    contadorCarrito.innerText = carritodeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritodeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

function recuperar() {
    let recuperarPedido = JSON.parse(localStorage.getItem('carrito'))

    if (recuperarPedido) {
        recuperarPedido.forEach(el => {
            mostrarCarrito(el)
            carritodeCompras.push(el)
            actualizarCarrito()


        })

    }
}
recuperar()







let numeroPedido = 998;


document.querySelector("#pagar").addEventListener("click", () =>
    Swal.fire({
        title: "Metodo de pago",
        text: "¿Desea abonar con efectivo o tarjeta?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: `El precio en efectivo es: $${precioTotal.innerHTML}`,
        cancelButtonText: `El precio con tarjeta es: $${precioTotal.innerHTML * 1.20}`,


    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: "Felicitaciones por su compra, lo derivamos con nuestro asesor para realizar la transferencia correspondiente",
                
                icon: "success",
               html:`
               <a href="https://api.whatsapp.com/send?phone=+543516142466&text=Hola%21%20Quisiera%20m%C3%A1s%20info%20."
                        target="_blank">
                        <p id="presionar">Presione Aqui para contactarse con nuestro asesor</p>
               <img class="wsp" src="./imagenes/Whatsapp-logo-5.png" alt="">
               `,

             
            } 
        
         
            
            )
         
            let btnVaciar = document.querySelector("#presionar")
            btnVaciar.addEventListener("click", () =>
            localStorage.clear('carrito'),
          
      
            )
            
        } else {
            Swal.fire({
                confirmButtonText:"Confirmar",
                title: "A continuacion podra ingresar los datos de su tarjeta",
                icon: "info",
               html:`
               <div class"form">
               <input type="text" class="form-control" placeholder="nombre y apellido">
               <select name="Tipo de Tarjeta" class="form control">
               <option>Visa</option>
               <option>Mastercard</option>
               <option>Cordobesa</option>
               <option>Naranja</option>
               </select>
              
               <input type="number" maxlength="16" placeholder="Numero de tarjeta" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" />
               <br>
               <input type="number" maxlength="3" placeholder="Codigo de tarjeta" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" />
               <input type="month" name="fecha" id="fecha" class="form-control" value="2022-04">
               <select name="Cantidad de pagos" class="form control">
               <option>1</option>
               <option>3</option>
               <option>6</option>
               <option>12</option>
               </div>
              
               `
            }).then((result) =>{
                if(result.isConfirmed){
                    swal.fire({
                        title:"Felicitaciones por su compra",
                        icon:"success",
                        html: `<p> n° de pedido ${numeroPedido+1}`
                        
                    }
                   
                    )
                    localStorage.clear('carrito');
                  
                }
                
             
            })
         

        }
      
    
    }
    
    )
  
)




document.querySelector("#mayor").addEventListener("click", () =>
    Swal.fire({
        title: "Puedes comprar en nuestra pagina",
        icon: "success",
        confirmButtonText: "Comprar",
        cancelButtonText: "Volver",
        showCancelButton: true,


    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('#contenedor-productos').style.display = "flex"
            document.querySelector("#bienvenido").innerHTML = `<h1 class="bienvenido2">BIENVENIDO A DIONISO SHOP DE BEBIDAS</h1>`

        }
        else {
            document.querySelector('#contenedor-productos').style.display = "flex"
        }
    }))


document.querySelector("#menor").addEventListener("click", () =>
    Swal.fire({
        title: "No puedes comprar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Volver",


    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('#contenedor-productos').style.display = "none"
           

        }
        else {
            document.querySelector('#contenedor-productos').style.display = "none"
        }
    }))
   