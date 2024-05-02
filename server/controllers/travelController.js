const Destination = require('../models/Destination');
const Package = require('../models/Package');
const Blog = require('../models/Blog');
const Guide = require('../models/Guide');

exports.getDestinations = async (req, res) => {
  try {
    const destinationsPerPage = parseInt(req.query.destinationsPerPage) || 4;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * destinationsPerPage;

    const destinations = await Destination.find().skip(skip).limit(destinationsPerPage);

    res.json({
      destinations,
      currentPage: page,
      destinationsPerPage,
      totalPages: Math.ceil(await Destination.countDocuments() / destinationsPerPage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPackages = async (req, res) => {
  try {
    // Find the destination based on the name
    const destination = await Destination.findOne({ name: req.params.destinationName });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Find all packages for the given destination
    const packages = await Package.find({ destination: destination.name });

    console.log("Fetching Data From the DataBase");
    res.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getPackage = async (req, res) => {
  try {
    // Find the package based on the packageId
    const packageId = req.params.packageId;
    const packageDetails = await Package.findById(packageId);

    if (!packageDetails) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json({ packageDetails });
  } catch (error) {
    console.error('Error fetching package details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const { user, content } = req.body;

    const packageDetails = await Package.findById(packageId);

    if (!packageDetails) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Check if the package has an "itn" field and handle accordingly
    const itn = packageDetails.itn || ''; // Default to an empty string if "itn" is not present

    // Add the review to the package
    packageDetails.reviews.push({ user, content });
    await packageDetails.save();

    res.status(201).json({
      message: 'Review added successfully',
      review: { user, content, itn },
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Search for packages by destination name or package name
// Search for packages by destination name or package name

exports.searchPackages = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const packages = await Package.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive package name search
      ],
    });

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive blog title search
      ],
    });

    res.status(200).json({ success: true, packages, blogs });
  } catch (error) {
    console.error('Error searching packages and blogs:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.getGuideDetails = async (req, res) => {
  try {
    const { guideName } = req.body;

    if (!guideName) {
      return res.status(400).json({ success: false, message: 'GuideName is required in the request body' });
    }

    const guide = await Guide.findOne({ name: guideName });

    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }

    res.status(200).json({ success: true, guide });
  } catch (error) {
    console.error('Error fetching guide details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
