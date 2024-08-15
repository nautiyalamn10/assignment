const { instance: store } = require('../store/inMemoryStore');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = store.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = store.getCart(userId);
    if (!cart) {
      cart = { userId, items: [] };
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, productName: product.name, price: product.price});
    }

    store.updateCart(cart);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

exports.getCart = (req, res) => {
  const userId = req.user.id;
  const cart = store.getCart(userId);

  // Convert cart product IDs to detailed product info
  const detailedCart = cart?.map(item => {
    const product = store.getProductById(item.productId);
    return {
      productId: item.productId,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
    };
  })||[];

  res.status(200).json(detailedCart);
};