const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// Assuming you have middleware for checking admin role

// Routes for packages

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Add a new package
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: body
 *         name: package
 *         description: The package to create
 *         schema:
 *           $ref: '#/definitions/Package'
 *     responses:
 *       '200':
 *         description: Package created successfully
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update an existing package
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         type: string
 *         description: The ID of the package to update
 *       - in: body
 *         name: package
 *         description: The package details to update
 *         schema:
 *           $ref: '#/definitions/Package'
 *     responses:
 *       '200':
 *         description: Package updated successfully
 *       '500':
 *         description: Internal server error
 * /packages/{packageId}:
 *   delete:
 *     summary: Delete a package
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         type: string
 *         description: The ID of the package to delete
 *     responses:
 *       '200':
 *         description: Package deleted successfully
 *       '500':
 *         description: Internal server error
 * definitions:
 *   Package:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *       guide:
 *         type: string
 */
router.post('/packages' , adminController.addPackage);
router.delete('/packages/:packageId', adminController.deletePackage);
router.put('/packages/:packageId', adminController.updatePackage);
// Routes for destinations

/**
 * @swagger
 * /destinations:
 *   post:
 *     summary: Add a new destination
 *     tags:
 *       - Destinations
 *     parameters:
 *       - in: body
 *         name: destination
 *         description: The destination to create
 *         schema:
 *           $ref: '#/definitions/Destination'
 *     responses:
 *       '200':
 *         description: Destination created successfully
 *       '500':
 *         description: Internal server error
 * /destinations/{destinationId}:
 *   delete:
 *     summary: Delete a destination
 *     tags:
 *       - Destinations
 *     parameters:
 *       - in: path
 *         name: destinationId
 *         required: true
 *         type: string
 *         description: The ID of the destination to delete
 *     responses:
 *       '200':
 *         description: Destination deleted successfully
 *       '500':
 *         description: Internal server error
 * definitions:
 *   Destination:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       location:
 *         type: string
 */
router.post('/destinations', adminController.addDestination);
router.delete('/destinations/:destinationId',  adminController.deleteDestination);

/**
 * @swagger
 * /create-admin:
 *   post:
 *     summary: Create a new admin user
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: body
 *         name: admin
 *         description: The admin details to create
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       '200':
 *         description: Admin user created successfully
 *       '500':
 *         description: Internal server error
 * definitions:
 *   Admin:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
// Route to create an admin user
router.post('/create-admin', adminController.createAdminUser);

// get routes
/**
 * @swagger
 * /destinations:
 *   get:
 *     summary: Get all destinations
 *     tags:
 *       - Destinations
 *     responses:
 *       '200':
 *         description: A list of destinations
 *       '500':
 *         description: Internal server error
 */
router.get('/destinations', adminController.getDestinations);

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     tags:
 *       - Packages
 *     responses:
 *       '200':
 *         description: A list of packages
 *       '500':
 *         description: Internal server error
 */
router.get('/packages', adminController.getPackages)

/**
 * @swagger
 * /packages/{guideId}:
 *   get:
 *     summary: Get all packages for a specific guide
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         type: string
 *         description: The ID of the guide whose packages to fetch
 *     responses:
 *       '200':
 *         description: A list of packages for the specified guide
 *       '500':
 *         description: Internal server error
 */
router.get('/packages/:guideId', adminController.getGuidePackages)

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       '200':
 *         description: A list of blogs
 *       '500':
 *         description: Internal server error
 */
router.get('/blogs', adminController.getBlogs)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: A list of users
 *       '500':
 *         description: Internal server error
 */

router.get('/users', adminController.getUsers)

/**
 * @swagger
 * /guides:
 *   get:
 *     summary: Get all guides
 *     tags:
 *       - Guides
 *     responses:
 *       '200':
 *         description: A list of guides
 *       '500':
 *         description: Internal server error
 */
router.get('/guides', adminController.getGuides)

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the blog to delete
 *     responses:
 *       '200':
 *         description: Blog deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/blogs/:id', adminController.deleteBlogs)

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *         description: The ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/users/:userId', adminController.deleteUser)

/**
 * @swagger
 * /guides/{guideId}:
 *   delete:
 *     summary: Delete a guide
 *     tags:
 *       - Guides
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         type: string
 *         description: The ID of the guide to delete
 *     responses:
 *       '200':
 *         description: Guide deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/guides/:guideId', adminController.deleteGuide)

/**
 * @swagger
 * /packages-for-graph:
 *   get:
 *     summary: Get all packages for graph
 *     tags:
 *       - Packages
 *     responses:
 *       '200':
 *         description: A list of packages for the graph
 *       '500':
 *         description: Internal server error
 */
router.get('/packages-for-graph' , adminController.getPackagesForGraph);

/**
 * @swagger
 * /active-users-count:
 *   get:
 *     summary: Get count of active users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Count of active users
 *       '500':
 *         description: Internal server error
 */
router.get('/active-users-count' , adminController.getActiveUsers);

/**
 * @swagger
 * /active-packages-counter:
 *   get:
 *     summary: Get count of active packages
 *     tags:
 *       - Packages
 *     responses:
 *       '200':
 *         description: Count of active packages
 *       '500':
 *         description: Internal server error
 */
router.get('/active-packages-counter' , adminController.getActivePackages);

/**
 * @swagger
 * /updates:
 *   get:
 *     summary: Fetch updates
 *     tags:
 *       - Updates
 *     responses:
 *       '200':
 *         description: Updates fetched successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/updates' , adminController.fetchUpdates);

/**
 * @swagger
 * /updates/{guideId}:
 *   get:
 *     summary: Fetch updates for a specific guide
 *     tags:
 *       - Updates
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         type: string
 *         description: The ID of the guide whose updates to fetch
 *     responses:
 *       '200':
 *         description: Updates for the specified guide fetched successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/updates/:guideId', adminController.fetchGuideUpdates);

/**
 * @swagger
 * /guide-updates:
 *   get:
 *     summary: Fetch revenue updates for all guides
 *     tags:
 *       - Updates
 *     responses:
 *       '200':
 *         description: Revenue updates for all guides fetched successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/guide-updates' , adminController.fetchGuideRevenue);

module.exports = router;