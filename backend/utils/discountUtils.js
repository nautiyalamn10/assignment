const { instance: store } = require('../store/inMemoryStore');

const N_TH_ORDER = 5; // Generate discount code for every 5th order

exports.generateDiscountIfNeeded = async () => {
  const orderCount = store.orders.length;
  if (orderCount % N_TH_ORDER === 0) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const discountCode = {
      code,
      percentage: 10,
      used: false,
    };
    store.addDiscountCode(discountCode);
  }
};