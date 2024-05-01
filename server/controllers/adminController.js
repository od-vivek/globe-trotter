const User = require('../models/User');
const Package = require('../models/Package');
const Destination = require('../models/Destination');
const Blog = require('../models/Blog')
const Booking = require('../models/Booking');
const Guide = require('../models/Guide');
const bcrypt = require('bcryptjs');

exports.addPackage = async (req, res, next) => {
  const { name, description, price, days, nights, destination, itn, imageUrls, reviews, guide } = req.body;

  try {
    const newPackage = new Package({ name, description, price, days, nights, destination, itn, imageUrls, reviews, guide });
    await newPackage.save();

    await Guide.findByIdAndUpdate(guide, { $push: { packages: newPackage._id } });

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

exports.updatePackage = async (req, res, next) => {
    const { packageId } = req.params;
    const updatedPackageData = req.body;
    try {
        const updatedPackage = await Package.findByIdAndUpdate(packageId, updatedPackageData, {new: true });
        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }
      
        res.status(200).json(updatedPackage);
    }
    catch (error) {
        console.error("Error updating package:", error);
        res.status(500).json({ message: "Internal server error" });
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

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.getGuidePackages = async (req, res) => {
    const { guideId } = req.params;
    try {
      const packages = await Package.find({ guide: guideId});
      res.status(200).json(packages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteBlogs = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


exports.getPackagesForGraph = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages for graph:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getActiveUsers = async (req, res) => {
  try {
    const users = await User.find();
    const activeUsersCount = users.length;
    res.json({ activeUsersCount });
  } catch (error) {
    console.error('Error fetching active users count:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getActivePackages = async (req, res) => {
  try {
    const packages = await Package.find();
    const activePackagesCount = packages.length;
    res.json({ activePackagesCount });
  } catch (error) {
    console.error('Error fetching active packages count:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.fetchUpdates = async (req, res) => {
    try {
        // Fetch bookings for today
        const todayBookings = await Booking.find()
        .sort({ createdAt: -1 })

        // Calculate revenue by package
        const revenueByPackage = {};
        let totalRevenue = 0;

        todayBookings.forEach((booking) => {
        const { package: packageType, totalAmount } = booking;

        if (revenueByPackage[packageType]) {
            revenueByPackage[packageType] += totalAmount;
        } else {
            revenueByPackage[packageType] = totalAmount;
        }

        totalRevenue += totalAmount;
        });

        // Calculate total number of active users
        const totalActiveUsers = await User.countDocuments();

        // Calculate total number of packages
        const totalPackages = await Package.countDocuments();

        // Calculate total number of destinations
        const totalDestinations = await Destination.countDocuments();

        // Calculate total number of guides
        const totalGuides = await Guide.countDocuments();

        // Create a chart object
        const chartData = {
        labels: Object.keys(revenueByPackage),
        datasets: [
            {
            label: 'Revenue by Package',
            data: Object.values(revenueByPackage),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            },
        ],
        };

        // Send the data as JSON
        res.json({
        todayBookings,
        revenueChart: chartData,
        totalRevenue,
        totalActiveUsers,
        totalPackages,
        totalDestinations,
        totalGuides,
        });
    } catch (error) {
        console.error('Error fetching updates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.fetchGuideUpdates = async (req, res) => {
    try {
        const guideId = req.params.guideId;

        const guidePackages = await Package.find({ guide: guideId });
        const packageNames = guidePackages.map(pkg => pkg.name);
        // Fetch bookings for today
        const todayBookings = await Booking.find({ package: { $in: packageNames } })
        .sort({ createdAt: -1 })

        // Calculate revenue by package
        const revenueByPackage = {};
        let totalRevenue = 0;

        todayBookings.forEach((booking) => {
        const { package: packageType, totalAmount } = booking;

        if (packageNames.includes(packageType)){
            if (revenueByPackage[packageType]) {
                revenueByPackage[packageType] += totalAmount;
            } else {
                revenueByPackage[packageType] = totalAmount;
            }

            totalRevenue += totalAmount;
        }
    });

        // Create a chart object
        const chartData = {
        labels: Object.keys(revenueByPackage),
        datasets: [
            {
            label: 'Revenue by Package',
            data: Object.values(revenueByPackage),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            },
        ],
        };

        // Send the data as JSON
        res.json({
        todayBookings,
        revenueChart: chartData,
        totalRevenue,
        });
    } catch (error) {
        console.error('Error fetching updates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.fetchGuideRevenue = async (req, res) => {
    try {
        // Fetch all guides
        const guides = await Guide.find();

        // Initialize object to store revenue generated by each guide
        const revenueByGuide = {};

        // Loop through each guide
        for (const guide of guides) {
            // Fetch packages associated with the guide
            const guidePackages = await Package.find({ guide: guide._id });
            const packageNames = guidePackages.map(pkg => pkg.name);

            // Fetch bookings for today where package name is present in the guide's packages
            const todayBookings = await Booking.find({ package: { $in: packageNames } });

            // Calculate revenue generated by the guide
            let totalRevenue = 0;
            todayBookings.forEach((booking) => {
                totalRevenue += booking.totalAmount;
            });

            // Store revenue generated by the guide
            revenueByGuide[guide.name] = totalRevenue;
        }

        // Create pie chart data
        const chartData = {
            labels: Object.keys(revenueByGuide),
            datasets: [
                {
                    data: Object.values(revenueByGuide),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        };

        // Send the data as JSON
        res.json({
            revenueByGuide,
            revenueChart: chartData,
        });
    } catch (error) {
        console.error('Error fetching updates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;

  try {
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'user deleted successfully!' });
  } catch (error) {
    next(error);
  }
}

exports.deleteGuide = async (req, res) => {
    const guideId = req.params.guideId;

  try {
    await Guide.findByIdAndDelete(guideId);

    res.status(200).json({ success: true, message: 'Guide deleted successfully!' });
  } catch (error) {
    next(error);
  }
}

exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
}

exports.getGuides = async (req, res) => {
    try {
      const guides = await Guide.find();
      res.status(200).json(guides);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
} 
