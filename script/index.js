import {menuArray as dataArray} from "./data.js"




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
        <button class="add-btn">+</button>
      </div>
    ` 
  });

return html

}







function render() {
  document.querySelector('#productos').innerHTML = getProductosHtml(dataArray)
}

render()