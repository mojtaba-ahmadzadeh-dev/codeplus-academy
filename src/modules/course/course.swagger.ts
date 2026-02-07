/**
 * @swagger
 * tags:
 *   name: Courses 🎓
 *   description: Course management APIs
 */

/**
 * @swagger
 * /courses/create:
 *   post:
 *     summary: Create a new course
 *     description: This API allows teachers or admins to create a new course. The course will be created with draft status by default.
 *     tags: [Courses 🎓]
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
 *               - description
 *               - price
 *               - level
 *               - duration
 *               - category_id
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title
 *                 example: دوره Next.js پیشرفته
 *               description:
 *                 type: string
 *                 description: Full course description
 *                 example: آموزش پروژه محور Next.js نسخه 15
 *               price:
 *                 type: number
 *                 description: Course price
 *                 example: 1500000
 *               discount:
 *                 type: number
 *                 nullable: true
 *                 description: Discount percentage
 *                 example: 20
 *               thumbnail:
 *                 type: string
 *                 nullable: true
 *                 description: Course thumbnail image URL
 *                 example: https://example.com/course.png
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 description: Course level
 *                 example: advanced
 *               duration:
 *                 type: number
 *                 description: Course duration in minutes
 *                 example: 900
 *               category_id:
 *                 type: number
 *                 description: Category ID of the course
 *                 example: 3
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: دوره آموزشی با موفقیت ایجاد شد
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Only admin or teacher can create course)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         slug:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         discount:
 *           type: number
 *           nullable: true
 *         thumbnail:
 *           type: string
 *           nullable: true
 *         level:
 *           type: string
 *         status:
 *           type: string
 *           example: draft
 *         duration:
 *           type: number
 *         teacher_id:
 *           type: number
 *         category_id:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 */