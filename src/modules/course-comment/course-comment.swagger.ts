/**
 * @swagger
 * tags:
 *   name: Course Comments 💬
 *   description: Course comment management APIs
 */

/**
 * @swagger
 * /course-comments/create:
 *   post:
 *     summary: Create a new course comment
 *     description: Create a comment for a specific course by a user.
 *     tags: [Course Comments 💬]
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

/**
 * @swagger
 * /course-comments:
 *   get:
 *     summary: Get all course comments
 *     description: Retrieve all comments for all courses
 *     tags: [Course Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کامنت‌ها با موفقیت دریافت شدند"
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CourseComment'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /course-comments/{id}:
 *   get:
 *     summary: Get a course comment by ID
 *     description: دریافت اطلاعات یک کامنت مشخص بر اساس ID
 *     tags: [Course Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه کامنت
 *     responses:
 *       200:
 *         description: Course comment fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کامنت با موفقیت دریافت شد"
 *                 comment:
 *                   $ref: '#/components/schemas/CourseComment'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "شناسه کامنت نامعتبر است"
 *       404:
 *         description: Course comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کامنت موردنظر پیدا نشد"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /course-comments/{id}/accept:
 *   patch:
 *     summary: Accept course comment
 *     tags: [Course Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment accepted successfully
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /course-comments/{id}/reject:
 *   patch:
 *     summary: Reject course comment
 *     tags: [Course Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment rejected successfully
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /course-comments/delete/{id}:
 *   delete:
 *     summary: Delete a course comment
 *     tags: [Course Comments 💬]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */