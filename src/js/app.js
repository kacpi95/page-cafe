import { settings } from './settings.js';

class App {
  constructor() {
    this.apiUrl = `${settings.db.url}/${settings.db.products}`;
    this.productsContainer = document.querySelector('.card-products');
    this.templateScript = document.querySelector('#product-template').innerHTML;
    this.template = Handlebars.compile(this.templateScript);
  }

  async init() {
    try {
      const products = await this.fetchProducts();
      this.renderProducts(products);
    } catch (error) {
      console.error('error', error);
    }
  }

  async fetchProducts() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) throw new Error('error');
    return await response.json();
  }

  renderProducts(products) {
    products = products.map((product, index) => {
      product.textSide = index % 2 === 0 ? 'card-left-one' : 'card-right-two';
      product.imageSide = index % 2 === 0 ? 'card-right-one' : 'card-left-two';
      product.image = `./images/coffee-${product.id}.png`;
      return product;
    });

    const html = this.template({ products });
    this.productsContainer.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
