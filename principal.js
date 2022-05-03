let carritodeCompras = []


const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

// const selecDescripcion = document.getElementById('selecDescripcion');
const buscador = document.getElementById('search');



// selecDescripcion.addEventListener('change',()=>{
//     if(selecDescripcion.value == 'all'){
//         mostrarProductos(stockProductos)
//     }else{
//         mostrarProductos(stockProductos.filter(elemento => elemento.descripcion == selecDescripcion.value))
//     }
// })

mostrarProductos(stockProductos)
// contenedorProductos.innerHTML= ""
function mostrarProductos(array) {
    array.forEach(({img, nombre, descripcion, tipo, precio, id}) => {
        let div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML += `
<div class="card" style="width: 18rem;">
<img src="${img}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">${descripcion}</p>
    <p> ${tipo}</p>
    <p> $${precio}</p>
       <a id="agregar${id}" class="btn btn-primary">Añadir</a>
    
</div>
</div>`
        contenedorProductos.appendChild(div);
        let btnAgregar = document.getElementById(`agregar${id}`)
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(id)
        })
    });
}

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
            if (result.isConfirmed) {
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                btnEliminar.parentElement.remove()
              
                carritodeCompras = carritodeCompras.filter(item => item.id != productoAgregar.id)

                actualizarCarrito()
                localStorage.setItem('carrito', JSON.stringify(carritodeCompras))
            } else {
                document.getElementById(`und${productoAgregar.id}`).innerHTML = ` <p id=und:${productoAgregar.id}>Und:${productoAgregar.cantidad} </p>`
                actualizarCarrito()
                localStorage.setItem('carrito', JSON.stringify(carritodeCompras))
                
            }
        }
        )
        //   if(productoAgregar.cantidad == 1){
        //         btnEliminar.parentElement.remove()
        //       carritodeCompras = carritodeCompras.filter(item=> item.id != productoAgregar.id)
        //       actualizarCarrito()
        //       localStorage.setItem('carrito', JSON.stringify(carritodeCompras))
        //   }else{
        //     productoAgregar.cantidad = productoAgregar.cantidad - 1
        //     document.getElementById(`und${productoAgregar.id}`).innerHTML =` <p id=und:${productoAgregar.id}>Und:${productoAgregar.cantidad} </p>`
        //    actualizarCarrito()
        //    localStorage.setItem('carrito', JSON.stringify(carritodeCompras))
        //   }
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



// let edad = 18;

// const resultado = edad >= 18 && "Puedes beber"
// console.log(resultado)




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
                title: "Felicitaciones por su compra",
                icon: "success",
                         
                
            }
            
            )
          
 

        } else {
            Swal.fire({
                title: "Felicitaciones, lo estaremos derivando con nuestro asesor para solicitar los datos de su tarjeta",
                icon: "success",
            })
           
        }
    }
     )
)



// document.querySelector("#mayor").addEventListener("click", () =>
//     Swal.fire({
//         title: "Puedes comprar en nuestra pagina",
//         icon: "success",
//        confirmButtonText: `Comprar <a href="./index.html"></a>`,
   

//     }
//      )
// )

// document.querySelector("#menor").addEventListener("click", () =>
//     Swal.fire({
//         title: "No puedes comprar",
//         icon: "warning",
//        confirmButtonText: `Confirmar <a href="./menor.html"></a>`,
   

//     }
//      )
// )