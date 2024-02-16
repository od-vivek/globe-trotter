const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Routes for packages
router.post('/create-blog' , blogController.postBlog);

module.exports = router;
