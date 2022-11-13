import {menuArray as dataArray} from "./data.js"

const ticketArray = []
let descuento = false


document.addEventListener('click', function(e) {
  if(e.target.dataset.agregarticket) {
    AgregarProducto(e.target.dataset.agregarticket)
  }
  if(e.target.dataset.btnremover) {
    ticketArray > 0 && removerProducto(e.target.dataset.btnremover)
  }
})

 function AgregarProducto(uuidProducto) {
  ticketArray.push(dataArray.find(producto => producto.id === uuidProducto))
  renderTicket(ticketArray)
 }

 function removerProducto(uuidProducto) {
  const indice = ticketArray.findIndex(producto => producto.id === uuidProducto)
  ticketArray.splice(indice,1)
  renderTicket()
}



function getProductosHtml(data) {
  let html = ''

  data.forEach(producto => {
    let ingredientsHtml = ''
    producto.ingredients.forEach(ingr => {
      ingredientsHtml += `${ingr}, `
    })
    html += `
      <div class="producto">
        <div>
          <p class="emoji">${producto.emoji}</p>
        </div>
        <div>
          <h3>${producto.name}</h3>
          <p>${ingredientsHtml}</p>
          <p class="precio">${producto.price}</p>
        </div>
        <button data-agregarticket="${producto.id}" class="add-btn">+</button>
      </div>
    ` 
  });

return html

}


function getTicketHtml(data) {
  const ticketActual = {
    precio: 0,
    tipoProducto: [],
    cantidadDescuento: 0,
    precioTotal: 0
  }
  
  let listadoHtml = []

  ticketArray.forEach( producto => {
    ticketActual.precio += producto.price
    ticketActual.tipoProducto.push(producto.type)
    if( 
      ticketActual.tipoProducto.some( tipo => tipo === 'food') &&
      ticketActual.tipoProducto.some( tipo => tipo ===  'drink') 
      ) {
      descuento = true
      ticketActual.cantidadDescuento = (ticketActual.precio / 100 * 10).toFixed(2)
      ticketActual.precioTotal = ticketActual.precio - ticketActual.cantidadDescuento
     
    } else {
      descuento = false
      ticketActual.precioTotal = ticketActual.precio
    }
   listadoHtml += `
        <div class="producto-unico">
          <h3>${producto.name}</h3>
          <button data-btnremover="${producto.id}" class="btn-quitar">Remover</button>
          <p>${producto.price}</p>
        </div>
   `
   
  } )
  const html = `
      <h3>Su pedido</h3>
      
      <div id="producto-listado">
        ${listadoHtml}
      </div>

        <div class="totales">
          <div class="totales-elemento">
            <h3>Precio:</h3>
            <p>${ticketActual.precio}</p>
          </div>
          <div class="totales-elemento">
            <p id="des-disponible" class="no-disponible">Descuento combo: <span>10%</span></p>
            <p>${ticketActual.cantidadDescuento}</p>
          </div>
          <div class="totales-elemento">
            <h3>Precio Total:</h3>
            <p>${ticketActual.precioTotal}</p>
          </div>
          <button class="btn-pedido">Completar pedido</button>
      </div>
  `
  return html
}




function renderProductos() {
  document.querySelector('#productos').innerHTML = getProductosHtml(dataArray)
}

renderProductos()


function renderTicket() {
  document.querySelector('#ticket').innerHTML = getTicketHtml(ticketArray)
  const descuentoParrafo = document.querySelector('#des-disponible')

if(descuento) {
  descuentoParrafo.classList.remove('no-disponible')
} else if(!descuento)
descuentoParrafo.classList.add('no-disponible')
}