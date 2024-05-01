const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const cacheddata = require("../middlewares/Rediscache")

// Routes for packages
router.post('/post', blogController.postBlog);
router.get('/get', cacheddata, blogController.fetchAllBlogs);

router.post('/guideblogs' , blogController.fetchGuideBlogs);
router.post('/dest-blogs' , blogController.fetchBlogsByDestination);
router.get('/:blogId' , blogController.fetchBlogById);

module.exports = router;
