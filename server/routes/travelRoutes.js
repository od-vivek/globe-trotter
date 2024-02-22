const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// Define a route for displaying destinations with dynamic pagination
router.get('/destinations', travelController.getDestinations);
router.get('/package/:packageId', travelController.getPackage);
router.get('/packages/:destinationName', travelController.getPackages);
router.post('/packages/review/:packageId', travelController.addReview);
router.get('/', travelController.searchPackages);
router.post('/guide' , travelController.getGuideDetails);

module.exports = router;
