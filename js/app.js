import { db } from './guitarras.js'

const divContainer = document.querySelector('main div')
const carritoContainer = document.querySelector('#carrito')

let carrito = []

const containerClicked = (e) => {
    if(e.target.classList.contains('btn')){
        const idGuitar = Number(e.target.getAttribute('data-id'))
        const idxGuitar = carrito.findIndex(g => g.id === idGuitar)
        if(idxGuitar === -1){
            carrito.push({
                ...db[idGuitar - 1],
                cantidad: 1
        })
        } else {
            carrito[idxGuitar].cantidad ++
        }    
        createCarrito()
    }
}

const carritoClicked = (e) => {
    if(e.target.classList.contains('btn')){
        const idGuitar = e.target.parentElement.parentElement.getAttribute('data-id')
        const buttonText = e.target.innerText
        const idxGuitar = carrito.findIndex(g => g.id == Number(idGuitar))
        if(buttonText === '-'){
            if(carrito[idxGuitar].cantidad > 1)
            carrito[idxGuitar].cantidad--
        }else if(buttonText === '+'){
            if (carrito[idxGuitar].cantidad < 10)
            carrito[idxGuitar].cantidad++
        }else if(buttonText === 'X'){
            carrito = carrito.filter(g => g.id !== Number(idGuitar))
        }else if(buttonText === 'VACIAR CARRITO'){
            carrito = []
        }
        createCarrito()
    }
}

const createCarrito = () => {
    if(carrito.length === 0){
        carritoContainer.innerHTML = '<p class="text-center">El carrito esta vacio</p>'
    }else{
        let total = 0
        let htmlCarrito = `<table class="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>`
        carrito.forEach(g => {
            total += g.cantidad * g.precio
            htmlCarrito +=`<tr data-id="${ g.id }">
                                <td>
                                    <img class="img-fluid" src="./img/${ g.imagen }.jpg" alt="imagen guitarra">
                                </td>
                                <td>${ g.nombre }</td>
                                <td class="fw-bold">
                                        $${ g.precio }
                                </td>
                                <td class="flex align-items-start gap-4">
                                    <button
                                        type="button"
                                        class="btn btn-dark"
                                    >-</button>
                                        ${ g.cantidad }
                                    <button
                                        type="button"
                                        class="btn btn-dark"
                                    >+</button>
                                </td>
                                <td>
                                    <button
                                        class="btn btn-danger"
                                        type="button"
                                    >X</button>
                                </td>
                            </tr>`
        })
        htmlCarrito += `</tbody>
                                    </table>

                                    <p class="text-end">Total pagar: <span class="fw-bold">${ total }</span></span></p>
                                    <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
        carritoContainer.innerHTML = htmlCarrito
    }
}

let html = ''
db.forEach(guitar => {
    html += `<div class="col-md-6 col-lg-4 my-4 row align-items-center">
                <div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
                    <button
                        data-id="${guitar.id}" 
                        type="button"
                        class="btn btn-dark w-100"
                    >Agregar al Carrito</button>
                </div>
            </div><!-- FIN GUITARRA -->`  
})

divContainer.innerHTML = html

createCarrito()

divContainer.addEventListener('click', containerClicked)
carritoContainer.addEventListener('click', carritoClicked)