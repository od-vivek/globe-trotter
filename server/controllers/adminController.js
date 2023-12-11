const User = require('../models/User');
const Package = require('../models/Package');
const Destination = require('../models/Destination');
const bcrypt = require('bcryptjs');

exports.addPackage = async (req, res, next) => {
  const { name, description, imageUrls, price, days, nights, reviews, destination, itn } = req.body;

  try {
    const newPackage = new Package({ name, description, imageUrls, days, nights, reviews, price, destination, itn });
    await newPackage.save();

    res.status(201).json({ success: true, message: 'Package added successfully!' });
  } catch (error) {
    next(error);
  }
};

exports.deletePackage = async (req, res, next) => {
  const packageId = req.params.packageId;

  try {
    await Package.findByIdAndDelete(packageId);

    res.status(200).json({ success: true, message: 'Package deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

exports.addDestination = async (req, res, next) => {
  const { name, description, imageUrls } = req.body;

  try {
    const newDestination = new Destination({ name, description, imageUrls });
    await newDestination.save();

    res.status(201).json({ success: true, message: 'Destination added successfully!' });
  } catch (error) {
    next(error);
  }
};

exports.deleteDestination = async (req, res, next) => {
  const destinationId = req.params.destinationId;

  try {
    await Destination.findByIdAndDelete(destinationId);

    res.status(200).json({ success: true, message: 'Destination deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

exports.createAdminUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdminUser = new User({ username, email, password: hashedPassword, role: 'admin' });
    await newAdminUser.save();

    res.status(201).json({ success: true, message: 'Admin user created successfully!' });
  } catch (error) {
    next(error);
  }
};