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

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Fetch all courses including category and teacher details. Only accessible by users with READ_COURSE permission.
 *     tags: [Courses 🎓]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Courses fetched successfully
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CourseWithRelations'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (user does not have permission)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseWithRelations:
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
 *         teacher:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             title:
 *               type: string
 *             description:
 *               type: string
 */

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a specific course by ID
 *     description: Fetch a single course including category and teacher details. Only accessible by users with READ_COURSE permission.
 *     tags: [Courses 🎓]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course to retrieve
 *         example: 5
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Course fetched successfully
 *                 course:
 *                   $ref: '#/components/schemas/CourseWithRelations'
 *       400:
 *         description: Invalid course ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (user does not have permission)
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     description: This API allows teachers or admins to update a course. You can update any of the course fields. Title changes will automatically update the slug.
 *     tags: [Courses 🎓]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course to update
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title
 *                 example: دوره Next.js پیشرفته (ویرایش شده)
 *               description:
 *                 type: string
 *                 description: Full course description
 *                 example: آموزش پروژه محور Next.js نسخه 15 - ویرایش شده
 *               price:
 *                 type: number
 *                 description: Course price
 *                 example: 2000000
 *               discount:
 *                 type: number
 *                 nullable: true
 *                 description: Discount percentage
 *                 example: 10
 *               thumbnail:
 *                 type: string
 *                 nullable: true
 *                 description: Course thumbnail image URL
 *                 example: https://example.com/course-updated.png
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 description: Course level
 *                 example: advanced
 *               duration:
 *                 type: number
 *                 description: Course duration in minutes
 *                 example: 950
 *               category_id:
 *                 type: number
 *                 description: Category ID of the course
 *                 example: 3
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 description: Course status
 *                 example: published
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: دوره با موفقیت به‌روزرسانی شد
 *                 course:
 *                   $ref: '#/components/schemas/CourseWithRelations'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Only admin or teacher can update course)
 *       404:
 *         description: Course not found
 *       409:
 *         description: Course with this title already exists
 *       500:
 *         description: Internal server error
 */