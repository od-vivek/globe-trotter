const Destination = require('../models/Destination');

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
