const { instance: store } = require('../store/inMemoryStore');
const discountUtils = require('../utils/discountUtils');

exports.processCheckout = async (req, res) => {
  try {
    const { userId, discountCode } = req.body;

    const cart = store.getCart(userId);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let total = cart.items.reduce((sum, item) => {
      const product = store.getProductById(item.productId);
      return sum + (product.price * item.quantity);
    }, 0);

    let discountAmount = 0;

    if (discountCode) {
      const validDiscount = store.getDiscountCode(discountCode);
      if (validDiscount) {
        discountAmount = total * (validDiscount.percentage / 100);
        total -= discountAmount;
        store.useDiscountCode(discountCode);
      } else {
        return res.status(400).json({ message: 'Invalid discount code' });
      }
    }

    const order = {
      userId,
      items: cart.items,
      total,
      discountCode,
      discountAmount,
      createdAt: new Date(),
    };

    store.addOrder(order);
    store.deleteCart(userId);

    // Generate new discount code if conditions are met
    await discountUtils.generateDiscountIfNeeded();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error processing checkout', error: error.message });
  }
};