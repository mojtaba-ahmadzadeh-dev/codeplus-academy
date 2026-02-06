/**
 * @swagger
 * tags:
 *   name: Categories 📂
 *   description: Category management APIs
 */

/**
 * @swagger
 * /categories/create:
 *   post:
 *     summary: Create a new category
 *     description: Create a category. You can optionally assign a parent category to create a subcategory.
 *     tags: [Categories 📂]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "All electronic devices"
 *               parentId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "ACTIVE"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error or parent category not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           example: "ACTIVE"
 *         parentId:
 *           type: integer
 *           nullable: true
 *         children:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories with their subcategories
 *     description: Retrieve all parent categories along with their children (subcategories)
 *     tags: [Categories 📂]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */