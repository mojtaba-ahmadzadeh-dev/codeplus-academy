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
 *                 example: "active"
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

/**
 * @swagger
 * /blogs/update/{id}:
 *   put:
 *     summary: Update a blog
 *     description: Update an existing blog. Only the blog author can update their blog.
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated blog title"
 *               content:
 *                 type: string
 *                 example: "Updated blog content"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending, accepted]
 *                 example: active
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog updated successfully
 *                 blog:
 *                   $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not have permission to update this blog
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Delete an existing blog. Only the blog author can delete their own blog.
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "بلاگ با موفقیت حذف شد"
 *       400:
 *         description: Invalid blog ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog id must be a number"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – user is not the blog author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "شما اجازه حذف این بلاگ را ندارید"
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{id}/like:
 *   put:
 *     summary: Like or dislike a blog
 *     description: Like or dislike a blog. If the user already liked/disliked, the reaction will be toggled. 
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isLike
 *             properties:
 *               isLike:
 *                 type: boolean
 *                 description: true = like, false = dislike
 *                 example: true
 *     responses:
 *       200:
 *         description: Reaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reaction updated"
 *                 likes:
 *                   type: integer
 *                   example: 5
 *                 dislikes:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Invalid input or blog ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid blog ID"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog not found"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{id}/bookmark:
 *   put:
 *     summary: Update bookmark status for a blog
 *     description: Toggle (add or remove) bookmark for the logged-in user on a specific blog.
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Bookmark updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Bookmark updated successfully"
 *               isBookmarked: true
 *               bookmarkCount: 6
 *       400:
 *         description: Invalid blog ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/my:
 *   get:
 *     summary: Get blogs of the logged-in user
 *     description: Retrieve all blogs created by the currently authenticated user with pagination.
 *     tags: [Blogs 📝]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *     responses:
 *       200:
 *         description: User blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blogs retrieved successfully
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 blogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
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
 *       500:
 *         description: Internal server error
 */