import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="container">
      <div>
        <img class="image" src="${product.image}">
      </div>
      <div class="info">
        <div>
          <p class="title">${product.name}</p>
        </div>
        <div class="rating-count">
          <img class="rating" src="${product.getStarsUrl()}">
          <div class="count">${product.rating.count}</div>
        </div>
        <div class="price">$${product.getPriceUrl()}</div>
        <div class="product-quantity">
          <select class="quantity js-quantity-selector-${product.id}">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        <div>
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img class="image-added" src="images/1930264_check_complete_done_green_success_icon.png">
            <p class="p-added">Added</p>
          </div>
          <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-Ecommerce-grid').innerHTML = productsHTML;

function updatecartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    // Retrieve the selected quantity
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectedQuantity = parseInt(quantitySelector.value, 10);

    // Pass the selected quantity to addToCart
    addToCart(productId, selectedQuantity);
    updatecartQuantity();

    const added = document.querySelector(`.js-added-to-cart-${productId}`);
    added.classList.add('is-added');
  });
});

