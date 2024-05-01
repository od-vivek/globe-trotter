const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/protect');

// Update user profile
/**
 * @swagger
 * /update/{userId}:
 *   post:
 *     summary: Update Current User
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: The user details to update.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/update/:userId', protect, userController.updateCurrentUser);

// Delete user account
/**
 * @swagger
 * /delete/{userId}:
 *   delete:
 *     summary: Delete Current User
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/delete/:userId', protect, userController.deleteUser);

// Update user password
/**
 * @swagger
 * /get/{userId}:
 *   get:
 *     summary: Get User by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User fetched successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get('/get/:userId', userController.getUser);

/**
 * @swagger
 * /check-password/{userId}:
 *   post:
 *     summary: Check User Password
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to check password.
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         description: The password to check.
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Password checked successfully
 *       '400':
 *         description: Invalid input
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/check-password/:userId', userController.checkPassword);

/**
 * @swagger
 * /add-to-wishlist/{userId}:
 *   post:
 *     summary: Add to User Wishlist
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to add to wishlist.
 *         schema:
 *           type: string
 *       - in: body
 *         name: item
 *         description: The item to add to wishlist.
 *         schema:
 *           type: object
 *           properties:
 *             itemId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Item added to wishlist successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/add-to-wishlist/:userId', userController.addToWishlist);

/**
 * @swagger
 * /fetch-wishlist/{userId}:
 *   get:
 *     summary: Fetch User Wishlist
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to fetch wishlist.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Wishlist fetched successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get('/fetch-wishlist/:userId', userController.fetchWishlist);

/**
 * @swagger
 * /delete-from-wishlist/{userId}:
 *   post:
 *     summary: Delete from User Wishlist
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete from wishlist.
 *         schema:
 *           type: string
 *       - in: body
 *         name: item
 *         description: The item to delete from wishlist.
 *         schema:
 *           type: object
 *           properties:
 *             itemId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Item deleted from wishlist successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/delete-from-wishlist/:userId', userController.deleteFromWishlist);

/**
 * @swagger
 * /bookings/latest:
 *   post:
 *     summary: Get Latest Booking
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user details to get the latest booking.
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Latest booking fetched successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/bookings/latest' , userController.getLatestBooking);

/**
 * @swagger
 * /bookings/{userId}:
 *   get:
 *     summary: Get User Bookings
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to fetch bookings.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Bookings fetched successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get('/bookings/:userId' , userController.getBookings);

module.exports = router;
