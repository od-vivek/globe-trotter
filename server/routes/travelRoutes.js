const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// Define a route for displaying destinations with dynamic pagination
/**
 * @swagger
 * /destinations:
 *   get:
 *     summary: Fetch All Destinations
 *     tags:
 *       - Travel
 *     responses:
 *       '200':
 *         description: Destinations fetched successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/destinations', travelController.getDestinations);
/**
 * @swagger
 * /package/{packageId}:
 *   get:
 *     summary: Fetch Package by ID
 *     tags:
 *       - Travel
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         description: ID of the package to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Package fetched successfully
 *       '404':
 *         description: Package not found
 *       '500':
 *         description: Internal server error
 */
router.get('/package/:packageId', travelController.getPackage);
/**
 * @swagger
 * /packages/{destinationName}:
 *   get:
 *     summary: Fetch Packages by Destination Name
 *     tags:
 *       - Travel
 *     parameters:
 *       - in: path
 *         name: destinationName
 *         required: true
 *         description: Name of the destination to fetch packages for.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Packages fetched successfully
 *       '404':
 *         description: Packages not found
 *       '500':
 *         description: Internal server error
 */
router.get('/packages/:destinationName', travelController.getPackages);
/**
 * @swagger
 * /packages/review/{packageId}:
 *   post:
 *     summary: Add Review to Package
 *     tags:
 *       - Travel
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         description: ID of the package to add review to.
 *         schema:
 *           type: string
 *       - in: body
 *         name: review
 *         description: The review to add.
 *         schema:
 *           type: object
 *           required:
 *             - rating
 *             - comment
 *           properties:
 *             rating:
 *               type: number
 *             comment:
 *               type: string
 *     responses:
 *       '200':
 *         description: Review added successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/packages/review/:packageId', travelController.addReview);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Search Packages
 *     tags:
 *       - Travel
 *     parameters:
 *       - in: query
 *         name: destination
 *         required: true
 *         type: string
 *         description: Name of the destination to search packages for.
 *       - in: query
 *         name: startDate
 *         required: true
 *         type: string
 *         description: Start date of the package.
 *       - in: query
 *         name: endDate
 *         required: true
 *         type: string
 *         description: End date of the package.
 *     responses:
 *       '200':
 *         description: Packages fetched successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.get('/', travelController.searchPackages);
/**
 * @swagger
 * /guide:
 *   post:
 *     summary: Fetch Guide Details
 *     tags:
 *       - Travel
 *     parameters:
 *       - in: body
 *         name: guide
 *         description: The guide to fetch details for.
 *         schema:
 *           type: object
 *           required:
 *             - guideName
 *           properties:
 *             guideName:
 *               type: string
 *     responses:
 *       '200':
 *         description: Guide details fetched successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/guide' , travelController.getGuideDetails);

module.exports = router;
