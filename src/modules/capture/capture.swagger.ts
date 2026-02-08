/**
 * @swagger
 * /captures/create:
 *   post:
 *     summary: Create a new capture
 *     description: This API allows creating a new capture (file, image, or video) linked to a course or lesson.
 *     tags: [Captures 🎥]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *                 description: Capture title
 *                 example: فایل نمونه درس React
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Upload a file (image, video, pdf, etc.)
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: Capture description
 *                 example: این یک فایل آموزشی برای بخش React است
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *                 description: Status of the capture
 *                 example: active
 *               courseId:
 *                 type: integer
 *                 nullable: true
 *                 description: Associated course ID
 *                 example: 1
 *               lessonId:
 *                 type: integer
 *                 nullable: true
 *                 description: Associated lesson ID
 *                 example: 5
 *     responses:
 *       201:
 *         description: Capture created successfully
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
 *                   example: Capture با موفقیت ایجاد شد
 *                 capture:
 *                   $ref: '#/components/schemas/Capture'
 */

/**
 * @swagger
 * /captures:
 *   get:
 *     summary: Get all captures
 *     description: دریافت لیست تمام capture ها
 *     tags: [Captures 🎥]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Captures fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 captures:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Capture'
 */