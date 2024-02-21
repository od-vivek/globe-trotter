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
router.post(
  '/guide/signup',
  upload.single('guidePhoto'),
  authController.guideSignup
);

// Guide Login
router.post(
  '/guide/login',
  authController.guideLogin
);

// Other authentication routes
router.post('/google', authController.google);
router.get('/logout', authController.getSignout);

module.exports = router;
