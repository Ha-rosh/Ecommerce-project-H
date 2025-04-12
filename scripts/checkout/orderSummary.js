import { cart, removeFromcart, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="checkout-container js-checkout-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>
        <div class="product-detail">
          <div class="product-image">
            <img class="product-image-checkout" src="${matchingProduct.image}">
          </div>
          <div>
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${matchingProduct.getPriceUrl()}</div>
            <div class="product-quantity">
              Quantity: ${cartItem.quantity} 
              <span class="cart-delete-link js-cart-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-option-title">Choose a delivery option:</div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)}-`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-day-price js-delivery-option" 
          data-product-id="${matchingProduct.id}" 
          data-delivery-option-id="${deliveryOption.id}">
          <div>
            <input class="delivery-input" type="radio" 
              ${isChecked ? 'checked' : ''} 
              name="delivery-option-${matchingProduct.id}">
          </div>
          <div>
            <div class="delivery-day">${dateString}</div>
            <div class="delivery-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-checkout-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-cart-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      removeFromcart(productId);

      const container = document.querySelector(`.js-checkout-container-${productId}`);
      container.remove();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  updateCheckoutQuantity();

  function updateCheckoutQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-items').innerHTML = cartQuantity;
  }
}