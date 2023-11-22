const Destination = require('../models/Destination');

exports.getDestinations = async (req, res) => {
    try {
        // Extract the number of destinations per page from the query parameters, default to 9 if not provided
        const destinationsPerPage = parseInt(req.query.destinationsPerPage) || 9;

        // Extract the page number from the query parameters, default to 1 if not provided
        const page = parseInt(req.query.page) || 1;

        // Calculate the skip value based on the page number
        const skip = (page - 1) * destinationsPerPage;

        // Fetch a limited number of destinations from the database
        const destinations = await Destination.find().skip(skip).limit(destinationsPerPage);

        // Respond with JSON data including destinations and pagination information
        res.json({
            destinations,
            currentPage: page,
            destinationsPerPage,
            totalPages: Math.ceil(await Destination.countDocuments() / destinationsPerPage),
        });
    } catch (error) {
        // Handle errors, e.g., log the error and send an error response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};