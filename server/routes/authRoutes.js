const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/guidePhotos'); // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the uploaded file
  },
});

// Create multer instance with the defined storage
const upload = multer({ storage: storage });

// User Signup
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User Signup
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - username
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             username:
 *               type: string
 *     responses:
 *       '200':
 *         description: User signed up successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post(
  '/signup',
  [
    // Validate and sanitize user input
    check('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required'),
  ],
  authController.postSignup
);

// User Login
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to login.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post(
  '/login',
  [
    // Validate and sanitize user input
    check('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ],
  authController.postLogin
);

// Handle the validation results
router.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
});

// Guide Signup
/**
 * @swagger
 * /guide/signup:
 *   post:
 *     summary: Guide Signup
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: formData
 *         name: guidePhoto
 *         type: file
 *         description: The photo of the guide
 *       - in: body
 *         name: guide
 *         description: The guide to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - username
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             username:
 *               type: string
 *     responses:
 *       '200':
 *         description: Guide signed up successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post(
  '/guide/signup',
  upload.single('guidePhoto'),
  authController.guideSignup
);

// Guide Login
/**
 * @swagger
 * /guide/login:
 *   post:
 *     summary: Guide Login
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: guide
 *         description: The guide to login.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Guide logged in successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post(
  '/guide/login',
  authController.guideLogin
);

// Other authentication routes
/**
 * @swagger
 * /google:
 *   post:
 *     summary: Google Authentication
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/google', authController.google);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: User Logout
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/logout', authController.getSignout);

module.exports = router;
