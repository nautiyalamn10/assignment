const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const discountRoutes = require('./routes/discountRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;