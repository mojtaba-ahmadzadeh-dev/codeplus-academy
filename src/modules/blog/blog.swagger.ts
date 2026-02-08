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
 * tags:
 *   name: Blogs 📝
 *   description: Blog management APIs
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs with search and pagination
 *     description: Retrieve all blogs. You can search by title or content, paginate results, and sort by newest or oldest.
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title or content
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of blogs per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *           default: newest
 *         description: Sort order based on creation date
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
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 sort:
 *                   type: string
 *                   example: "newest"
 *                 blogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
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
 *           example: 1
 *         title:
 *           type: string
 *           example: "My First Blog"
 *         content:
 *           type: string
 *           example: "Blog content..."
 *         status:
 *           type: string
 *           example: "active"
 *         authorId:
 *           type: integer
 *           example: 15
 *         categoryId:
 *           type: integer
 *           nullable: true
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-02-08T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-02-08T12:34:56.789Z"
 */

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blogs 📝]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog fetched successfully"
 *                 blog:
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Invalid blog ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/admin/create:
 *   post:
 *     summary: Create blog by admin
 *     description: Admin can create a blog for any author.
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
 *                 example: "Admin blog title"
 *               content:
 *                 type: string
 *                 example: "This blog was created by admin"
 *               status:
 *                 type: string
 *                 example: "active"
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 example: 3
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog created successfully
 *                 blog:
 *                   $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */