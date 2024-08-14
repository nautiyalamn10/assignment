const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Process checkout
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *               discountCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cart is empty or invalid discount code
 *       500:
 *         description: Server error
 */
router.post('/', checkoutController.processCheckout);

module.exports = router;