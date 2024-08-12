const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/stats', authMiddleware.isAdmin, adminController.getStats);

module.exports = router;