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

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Get all lessons
 *     description: Retrieve a list of all lessons.
 *     tags: [Lessons 🎓]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lessons fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lesson'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     summary: Get lesson by id
 *     description: Retrieve a single lesson by its ID.
 *     tags: [Lessons 🎓]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Lesson fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lesson:
 *                   $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Lesson not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /lessons/update/{id}:
 *   put:
 *     summary: Update lesson
 *     description: Update a lesson by its ID.
 *     tags: [Lessons 🎓]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Advanced React"
 *               description:
 *                 type: string
 *                 example: "Updated lesson description"
 *               status:
 *                 type: string
 *                 example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lesson:
 *                   $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Lesson not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /lessons/delete/{id}:
 *   delete:
 *     summary: Delete lesson
 *     description: Delete a lesson by its ID.
 *     tags: [Lessons 🎓]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "درس با موفقیت حذف شد"
 *       404:
 *         description: Lesson not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */