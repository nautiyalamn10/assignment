const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  total: { type: Number, required: true },
  discountCode: { type: String },
  discountAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);