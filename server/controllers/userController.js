const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update user profile and/or password
exports.checkPassword = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        res.status(200).json({ success: true, message: 'Password check successful' });
    } catch (error) {
        next(error);
    }
};

exports.updateCurrentUser = async (req, res, next) => {
    const userId = req.params.userId;
    const { username, email, newPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update user fields
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }

        // Update password if newPassword is provided
        if (newPassword) {
            // Hash the new password before saving
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
        }

        await user.save();

        res.status(200).json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        next(error);
    }
};


// Delete user account
exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash the new password before saving
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send relevant user information (excluding sensitive fields if needed)
        const userInfo = {
            username: user.username,
            email: user.email,
            // Add more fields as needed
        };

        res.status(200).json({ success: true, user: userInfo });
    } catch (error) {
        next(error);
    }
};