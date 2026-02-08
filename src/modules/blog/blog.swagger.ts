/**
 * @swagger
 * tags:
 *   name: Blogs 📝
 *   description: Blog management APIs
 */

/**
 * @swagger
 * /blogs/create:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog post. The authorId is automatically extracted from the logged-in user (JWT token).
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Blog"
 *               content:
 *                 type: string
 *                 example: "This is the content of my first blog."
 *               status:
 *                 type: string
 *                 example: "DRAFT"
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Validation error (title, content or authorId missing)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Title, content and authorId are required."
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         status:
 *           type: string
 *           example: "DRAFT"
 *         authorId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve all blogs, ordered by creation date (newest first).
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blogs retrieved successfully"
 *                 blogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */