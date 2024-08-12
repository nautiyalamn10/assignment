const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/generate', authMiddleware.isAdmin, discountController.generateDiscountCode);

module.exports = router;