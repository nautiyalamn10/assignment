class InMemoryStore {
    constructor() {
      if (InMemoryStore.instance) {
        return InMemoryStore.instance;
      }
      this.products = [];
      this.carts = [];
      this.orders = [];
      this.discountCodes = [];
      InMemoryStore.instance = this;
    }
  
    // Product methods
    addProduct(product) {
      product.id = this.products.length + 1;
      this.products.push(product);
      return product;
    }
  
    getProductById(id) {
      return this.products.find(p => p.id === id);
    }
  
    // Cart methods
    getCart(userId) {
      return this.carts.find(c => c.userId === userId);
    }
  
    updateCart(cart) {
      const index = this.carts.findIndex(c => c.userId === cart.userId);
      if (index !== -1) {
        this.carts[index] = cart;
      } else {
        this.carts.push(cart);
      }
      return cart;
    }
  
    deleteCart(userId) {
      const index = this.carts.findIndex(c => c.userId === userId);
      if (index !== -1) {
        this.carts.splice(index, 1);
      }
    }
  
    // Order methods
    addOrder(order) {
      order.id = this.orders.length + 1;
      this.orders.push(order);
      return order;
    }
  
    // Discount code methods
    addDiscountCode(code) {
      this.discountCodes.push(code);
      return code;
    }
  
    getDiscountCode(code) {
      return this.discountCodes.find(dc => dc.code === code && !dc.used);
    }
  
    useDiscountCode(code) {
      const discountCode = this.discountCodes.find(dc => dc.code === code && !dc.used);
      if (discountCode) {
        discountCode.used = true;
      }
      return discountCode;
    }
  
    // Stats methods
    getStats() {
      const totalOrders = this.orders.length;
      const totalPurchaseAmount = this.orders.reduce((sum, order) => sum + order.total, 0);
      const totalDiscountAmount = this.orders.reduce((sum, order) => sum + (order.discountAmount || 0), 0);
      return {
        totalOrders,
        totalPurchaseAmount,
        discountCodes: this.discountCodes.map(dc => dc.code),
        totalDiscountAmount,
      };
    }
  }
  
  // Export the single instance of InMemoryStore
const instance = new InMemoryStore();

function seedData() {
    const store = InMemoryStore.instance || new InMemoryStore();

    store.addProduct({ name: 'Product 1', price: 100 });
    store.addProduct({ name: 'Product 2', price: 200 });
    store.addProduct({ name: 'Product 3', price: 300 });

    console.log('Seed data added to store');
}

module.exports = {
    instance,
    seedData
};