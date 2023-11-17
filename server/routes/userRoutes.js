const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/protect');

// Update user profile
router.post('/update/:userId', protect , userController.updateUser);

// Delete user account
router.delete('/delete/:userId', protect , userController.deleteUser);

// Update user password
router.post('/update-password/:userId', protect , userController.updatePassword);

router.get('/get/:userId', userController.getUser);

module.exports = router;
