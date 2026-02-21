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