// routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Define payment routes
/**
 * @swagger
 * /create-checkout-session:
 *   post:
 *     summary: Create Checkout Session
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: body
 *         name: checkout
 *         description: The checkout session details.
 *         schema:
 *           type: object
 *           required:
 *             - priceId
 *           properties:
 *             priceId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Checkout session created successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/create-checkout-session', paymentController.createCheckoutSession);

module.exports = router;
