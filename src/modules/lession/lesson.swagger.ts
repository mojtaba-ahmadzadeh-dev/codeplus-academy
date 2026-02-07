/**
 * @swagger
 * tags:
 *   name: Lessons 🎓
 *   description: Lesson management APIs
 */

/**
 * @swagger
 * /lessons/create:
 *   post:
 *     summary: Create a new lesson
 *     description: Create a lesson under a specific course.
 *     tags: [Lessons 🎓]
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
 *               - courseId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to React"
 *               description:
 *                 type: string
 *                 example: "First lesson of the React course"
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "ACTIVE"
 *     responses:
 *       201:
 *         description: Lesson created successfully
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
 *                   $ref: '#/components/schemas/Lesson'
 *       400:
 *         description: Validation error or course not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         courseId:
 *           type: integer
 *         status:
 *           type: string
 *           example: "ACTIVE"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */