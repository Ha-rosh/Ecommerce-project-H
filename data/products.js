import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/rating-${this.rating.stars * 10}.png`;
  }

  getPriceUrl() {
    return `${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

export const products = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    image: 'images/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton 6-Socks',
    rating: { stars: 4.5, count: 87 },
    priceCents: 1090,
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    image: 'images/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: { stars: 4.0, count: 127 },
    priceCents: 2095,
  },
  {
    id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    image: 'images/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt 2-Pack',
    rating: { stars: 4.5, count: 127 },
    priceCents: 799,
    type: 'clothing',
    sizeChartLink: 'images/clothing-size-chart.png',
  },
  {
    id: '54e0eccd-8f36-462b-b68a-8182611d9add',
    image: 'images/black-2-slot-toaster.jpg',
    name: 'Black 2-Slot Toaster',
    rating: { stars: 5, count: 2197 },
    priceCents: 1899,
  },
  {
    id: '77919bbe-0e56-475b-adde-4f24dfed3a04',
    image: 'images/luxury-tower-set-6-piece.jpg',
    name: 'Luxury Tower Set 6-Piece',
    rating: { stars: 4, count: 197 },
    priceCents: 2599,
  },
  {
    id: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
    image: 'images/floral-mixing-bowl-set.jpg',
    name: 'Floral Mixing Bowl Set',
    rating: { stars: 4.5, count: 219 },
    priceCents: 1299,
  },
  {
    id: 'c9c52b5-5a19-4bcb-a5d1-158a74287c53',
    image: 'images/facial-tissue-2-ply-18-boxes.jpg',
    name: 'Facial Tissue 2-Ply 18-Boxes',
    rating: { stars: 5, count: 257 },
    priceCents: 899,
  },
  {
    id: '5968897c-4d27-4872-89f6-5bcb052746d7',
    image: 'images/electric-glass-and-steel-hot-water-kettle.webp',
    name: 'Electric Glass and Steel Hot Water Kettle',
    rating: { stars: 4.5, count: 1987 },
    priceCents: 3599,
  },
  {
    id: 'aad29d11-ea98-41ee-9285-b916638cac4a',
    image: 'images/countertop-blender-64-oz.jpg',
    name: 'Countertop Blender 64-Oz',
    rating: { stars: 4.5, count: 1987 },
    priceCents: 3599,
  },
  {
    id: '82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
    image: 'images/blackout-curtains-black.jpg',
    name: 'Blackout Curtains Black',
    rating: { stars: 5, count: 987 },
    priceCents: 2599,
  },
  {
    id: 'e4f64a65-1377-42bc-89a5-e572d19252e2',
    image: 'images/black-2-slot-toaster.jpg',
    name: 'Black 2-Slot Toaster',
    rating: { stars: 5, count: 2197 },
    priceCents: 1899,
  },
  {
    id: 'b0f17cc5-8b40-4ca5-9142-b61fe3d98c85',
    image: 'images/luxury-tower-set-6-piece.jpg',
    name: 'Luxury Tower Set 6-Piece',
    rating: { stars: 4, count: 197 },
    priceCents: 2599,
  },
].map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});

