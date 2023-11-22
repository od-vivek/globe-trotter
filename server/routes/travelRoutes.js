const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// Define a route for displaying destinations with dynamic pagination
router.get('/destinations', travelController.getDestinations);

module.exports = router;
