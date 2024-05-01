const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Destination = require('../models/Destination'); // Import the Destination model
const Booking = require('../models/Booking'); // Make sure to adjust the path

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

exports.addToWishlist = async (req, res) => {
  const { userId } = req.params;
  const dest = req.body.dest;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product ID is already in the wishlist
    if (user.wishlist.includes(dest)) {
      return res.status(400).json({ error: 'Product is already in the wishlist' });
    }

    // Add the product ID to the wishlist
    user.wishlist.push(dest);

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.fetchWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the destinations based on destination names in the wishlist
    const wishlistDestinations = await Destination.find({ name: { $in: user.wishlist } });

    // Return the wishlist destinations
    return res.status(200).json({ wishlist: wishlistDestinations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteFromWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { destinationName } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Directly remove the destinationName from the wishlist array
    const index = user.wishlist.indexOf(destinationName);

    if (index !== -1) {
      user.wishlist.splice(index, 1);
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Destination removed from wishlist successfully' });
  } catch (error) {
    console.error('Error deleting from wishlist:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getLatestBooking = async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    // Find the latest booking for the user
    const latestBooking = await Booking.findOne({ user: userId })
      .sort({ createdAt: 'desc' }) // Sort by createdAt in descending order to get the latest booking
      .limit(1);

    if (!latestBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      package: latestBooking.package,
      numberOfMembers: latestBooking.numberOfMembers,
      selectedDate: latestBooking.selectedDate,
      totalAmount: latestBooking.totalAmount,
      createdAt: latestBooking.createdAt,
    });
  } catch (error) {
    console.error('Error fetching latest booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve all bookings for the user, sorted by selectedDate in descending order
    const bookings = await Booking.find({ user: userId })
      .sort({ selectedDate: -1 })
      .lean();

    // Check if there are bookings
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for the user' });
    }

    // Send the booking objects with details to the frontend
    res.json({ bookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
