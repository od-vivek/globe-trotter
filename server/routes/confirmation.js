const express = require('express');
const confirmationController = require('../controllers/confirmation');

const router = express.Router();

/**
 * @swagger
 * /send-confirmation-email:
 *   post:
 *     summary: Send Confirmation Email
 *     tags:
 *       - Confirmation
 *     parameters:
 *       - in: body
 *         name: email
 *         description: The email to send confirmation to.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       '200':
 *         description: Confirmation email sent successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/send-confirmation-email', confirmationController.sendConfirmationEmail);

module.exports = router;
