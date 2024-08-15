class InMemoryStore {
    constructor() {
      if (InMemoryStore.instance) {
        return InMemoryStore.instance;
      }
      this.products = [];
      this.carts = [];
      this.orders = [];
      this.discountCodes = [];
      this.users = [];
      InMemoryStore.instance = this;
    }
  
    //get all products
    getProducts(){
      return this.products;
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

    doesEmailExist(email){
      const emailExists = this.users.filter(cur_user=>cur_user.email===email);
      return emailExists;
    }

    getUserByEmail(email) {
      return this.users.find(u => u.email === email);
    }

    addUser(user){
      
      if(this.doesEmailExist(user.email).length){
        throw new Error(`User with email : ${user.email} already exists in the database`);
      }
      const userPayload = { ...user, id: this.users.length };
      this.users.push(userPayload);
      return userPayload;
    }
  }
  
  // Export the single instance of InMemoryStore
const instance = new InMemoryStore();

function seedData() {
    const store = InMemoryStore.instance || new InMemoryStore();

    store.addProduct({ name: 'Product 1', price: 100, availableUnits: 5 });
    store.addProduct({ name: 'Product 2', price: 200, availableUnits: 5 });
    store.addProduct({ name: 'Product 3', price: 300, availableUnits: 5 });

    store.addUser({
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password'
    })

    console.log('Seed data added to store');
}

module.exports = {
    instance,
    seedData
};