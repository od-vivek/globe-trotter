const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/isAdmin');
// Assuming you have middleware for checking admin role

// Routes for packages
router.post('/packages' , adminController.addPackage);
router.delete('/packages/:packageId', adminController.deletePackage);

// Routes for destinations
router.post('/destinations', adminController.addDestination);
router.delete('/destinations/:destinationId',  adminController.deleteDestination);

// Route to create an admin user
router.post('/create-admin', adminController.createAdminUser);

// get routes
router.get('/destinations', adminController.getDestinations);
router.get('/packages', adminController.getPackages)
router.get('/blogs', adminController.getBlogs)

router.delete('/blogs/:id', adminController.deleteBlogs)

module.exports = router;