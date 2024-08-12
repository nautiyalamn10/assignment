const { instance: store } = require('../store/inMemoryStore');

exports.generateDiscountCode = async (req, res) => {
  try {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const discountCode = {
      code,
      percentage: 10,
      used: false,
    };
    store.addDiscountCode(discountCode);
    res.status(200).json(discountCode);
  } catch (error) {
    res.status(500).json({ message: 'Error generating discount code', error: error.message });
  }
};