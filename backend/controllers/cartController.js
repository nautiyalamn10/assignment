const { instance: store } = require('../store/inMemoryStore');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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
      cart.items.push({ productId, quantity });
    }

    store.updateCart(cart);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};