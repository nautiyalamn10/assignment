const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const cookieParser = require('cookie-parser');

const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const discountRoutes = require('./routes/discountRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { isAuthorized } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/cart', isAuthorized, cartRoutes);
app.use('/api/checkout', isAuthorized, checkoutRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', isAuthorized, productRoutes)
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;