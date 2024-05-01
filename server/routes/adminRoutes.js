const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// Assuming you have middleware for checking admin role

// Routes for packages
router.post('/packages' , adminController.addPackage);
router.delete('/packages/:packageId', adminController.deletePackage);
router.put('/packages/:packageId', adminController.updatePackage);
// Routes for destinations
router.post('/destinations', adminController.addDestination);
router.delete('/destinations/:destinationId',  adminController.deleteDestination);

// Route to create an admin user
router.post('/create-admin', adminController.createAdminUser);

// get routes
router.get('/destinations', adminController.getDestinations);
router.get('/packages', adminController.getPackages)
router.get('/packages/:guideId', adminController.getGuidePackages)
router.get('/blogs', adminController.getBlogs)
router.get('/users', adminController.getUsers)
router.get('/guides', adminController.getGuides)

router.delete('/blogs/:id', adminController.deleteBlogs)
router.delete('/users/:userId', adminController.deleteUser)
router.delete('/guides/:guideId', adminController.deleteGuide)

router.get('/packages-for-graph' , adminController.getPackagesForGraph);
router.get('/active-users-count' , adminController.getActiveUsers);
router.get('/active-packages-counter' , adminController.getActivePackages);

router.get('/updates' , adminController.fetchUpdates);
router.get('/updates/:guideId', adminController.fetchGuideUpdates);
router.get('/guide-updates' , adminController.fetchGuideRevenue);

module.exports = router;