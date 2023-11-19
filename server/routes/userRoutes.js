const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/protect');

// Update user profile
router.post('/update/:userId', protect, userController.updateCurrentUser);

// Delete user account
router.delete('/delete/:userId', protect, userController.deleteUser);

// Update user password
router.get('/get/:userId', userController.getUser);

router.post('/check-password/:userId', userController.checkPassword);

module.exports = router;
