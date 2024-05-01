const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const cacheddata = require("../middlewares/Rediscache")

// Routes for packages
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Post Blog
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: body
 *         name: blog
 *         description: The blog to post.
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - content
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       '200':
 *         description: Blog posted successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/post', blogController.postBlog);
/**
 * @swagger
 * /get:
 *   get:
 *     summary: Fetch All Blogs
 *     tags:
 *       - Blog
 *     responses:
 *       '200':
 *         description: Blogs fetched successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/get', cacheddata, blogController.fetchAllBlogs);
/**
 * @swagger
 * /guideblogs:
 *   post:
 *     summary: Fetch Blogs for a Specific Guide
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: body
 *         name: guide
 *         description: The guide to fetch blogs for.
 *         schema:
 *           type: object
 *           required:
 *             - guideName
 *           properties:
 *             guideName:
 *               type: string
 *     responses:
 *       '200':
 *         description: Blogs fetched successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/guideblogs' , blogController.fetchGuideBlogs);
/**
 * @swagger
 * /dest-blogs:
 *   post:
 *     summary: Fetch Blogs by Destination
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: body
 *         name: destination
 *         description: The destination to fetch blogs for.
 *         schema:
 *           type: object
 *           required:
 *             - destination
 *           properties:
 *             destination:
 *               type: string
 *     responses:
 *       '200':
 *         description: Blogs fetched successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/dest-blogs' , blogController.fetchBlogsByDestination);
/**
 * @swagger
 * /{blogId}:
 *   get:
 *     summary: Fetch Blog by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog fetched successfully
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:blogId' , blogController.fetchBlogById);

module.exports = router;
