const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/discount/generate:
 *   get:
 *     summary: Generate a new discount code
 *     tags: [Discount]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The generated discount code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountCode'
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.get('/generate', authMiddleware.isAdmin, discountController.generateDiscountCode);

module.exports = router;