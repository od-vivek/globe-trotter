const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

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
  [
    // Validate and sanitize guide input
    check('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('name')
      .not()
      .isEmpty()
      .withMessage('Name is required'),
  ],
  authController.guideSignup
);

// Guide Login
router.post(
  '/guide/login',
  [
    // Validate and sanitize guide input
    check('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ],
  authController.guideLogin
);

// Other authentication routes
router.post('/google', authController.google);
router.get('/logout', authController.getSignout);

module.exports = router;
