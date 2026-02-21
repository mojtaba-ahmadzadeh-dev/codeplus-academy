/**
 * @swagger
 * tags:
 *   name: Blog Comments 💬
 *   description: APIs for creating and managing blog comments
 */

/**
 * @swagger
 * /blog-comments:
 *   post:
 *     summary: Create a new blog comment
 *     tags: [Blog Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogId
 *               - content
 *             properties:
 *               blogId:
 *                 type: integer
 *                 example: 12
 *               content:
 *                 type: string
 *                 example: "خیلی مقاله خوبی بود"
 *
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:   # 👈 اینجا درست بود
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment created
 *                 data:
 *                   type: object
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blog-comments/{blogId}:
 *   get:
 *     summary: Get all comments of a blog
 *     tags: [Blog Comments 💬]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 37
 *
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       400:
 *         description: Bad Request - Invalid blog ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid blog ID
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *
 *       404:
 *         description: Comments not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No comments found
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */