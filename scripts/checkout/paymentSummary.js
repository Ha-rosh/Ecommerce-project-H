import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const estimatedTax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + estimatedTax;

  const paymentSummaryHTML = `
    <div class="order-summary-title">Order Summary</div>
    <div class="summary-row">
      <div>Items(3):</div>
      <div>$${formatCurrency(productPriceCents)}</div>
    </div>
    <div class="summary-row">
      <div>Shipping & Handling:</div>
      <div class="shipping-price">$${formatCurrency(shippingPriceCents)}</div>
    </div>
    <div class="summary-row">
      <div>Total before tax:</div>
      <div>$${formatCurrency(totalBeforeTax)}</div>
    </div>
    <div class="summary-row">
      <div>Estimated tax (10%):</div>
      <div>$${formatCurrency(estimatedTax)}</div>
    </div>
    <div class="order-total">
      <div>Order total:</div>
      <div>$${formatCurrency(orderTotal)}</div>
    </div>
    <button class="summary-button js-place-order">Place your order</button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}



