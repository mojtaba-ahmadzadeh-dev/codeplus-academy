/**
 * @swagger
 * tags:
 *   name: CourseComments 💬
 *   description: Course comment management APIs
 */

/**
 * @swagger
 * /course-comments/create:
 *   post:
 *     summary: Create a new course comment
 *     description: Create a comment for a specific course by a user.
 *     tags: [CourseComments 💬]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - courseId
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This course is very helpful!"
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Course comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کامنت با موفقیت ایجاد شد"
 *                 comment:
 *                   $ref: '#/components/schemas/CourseComment'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseComment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         courseId:
 *           type: integer
 *         userId:
 *           type: integer
 *         content:
 *           type: string
 *         status:
 *           type: string
 *           example: "active"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */