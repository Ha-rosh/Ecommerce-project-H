export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    },
  ];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity; // Add the selected quantity
  } else {
    cart.push({
      productId: productId,
      quantity: quantity, // Use the selected quantity
      deliveryOptionId: '1',
    });
  }
  saveToStorage();
}

export function removeFromcart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    if (newQuantity > 0) {
      matchingItem.quantity = newQuantity;
    } else {
      // Remove item if quantity is set to 0
      cart = cart.filter((cartItem) => cartItem.productId !== productId);
    }
    saveToStorage();
  }
}

// Ensure the event listener handles quantity changes correctly
document.addEventListener('change', (event) => {
  if (event.target && event.target.classList.contains('js-quantity-selector')) {
    const productId = event.target.dataset.productId;
    const newQuantity = Number(event.target.value);

    if (productId && !isNaN(newQuantity)) {
      updateQuantity(productId, newQuantity);
    }
  }
});
