const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

    if (username) user.username = username;
    if (email) user.email = email;

    if (newPassword) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }

    await user.save();

    res.status(200).json({ success: true, message: 'User updated successfully', user });
  } catch (error) {
    next(error);
  }
};

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

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
