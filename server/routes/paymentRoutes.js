// routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Define payment routes
router.post('/create-checkout-session', paymentController.createCheckoutSession);

module.exports = router;
