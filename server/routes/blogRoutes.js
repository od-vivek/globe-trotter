const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Routes for packages
router.post('/post', blogController.postBlog);
router.get('/get', blogController.fetchAllBlogs);
router.post('/guideblogs' , blogController.fetchGuideBlogs);
router.post('/dest-blogs' , blogController.fetchBlogsByDestination);
router.get('/:blogId' , blogController.fetchBlogById);

module.exports = router;
