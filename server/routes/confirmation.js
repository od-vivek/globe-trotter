const express = require('express');
const confirmationController = require('../controllers/confirmation');

const router = express.Router();

router.post('/send-confirmation-email', confirmationController.sendConfirmationEmail);

module.exports = router;
