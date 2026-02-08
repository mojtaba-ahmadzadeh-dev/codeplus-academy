/**
 * @swagger
 * /captures/create:
 *   post:
 *     summary: Create a new capture
 *     description: This API allows creating a new capture (file, image, or video) linked to a course.
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
 * components:
 *   schemas:
 *     Capture:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         title:
 *           type: string
 *           example: ویدیوی جلسه اول
 *         description:
 *           type: string
 *           nullable: true
 *           example: توضیحات ویدیو
 *         status:
 *           type: string
 *           enum: [active, inactive, pending]
 *           example: active
 *         url:
 *           type: string
 *           example: /uploads/video.mp4
 *         courseId:
 *           type: integer
 *           nullable: true
 *           example: 1
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
 *                   description: لیست capture ها
 *                   items:
 *                     $ref: '#/components/schemas/Capture'
 */

/**
 * @swagger
 * /captures/{id}:
 *   get:
 *     summary: Get a capture by ID
 *     description: دریافت اطلاعات یک Capture مشخص با ID.
 *     tags: [Captures 🎥]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID capture
 *     responses:
 *       200:
 *         description: Capture fetched successfully
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
 *                   example: Capture با موفقیت دریافت شد
 *                 capture:
 *                   $ref: '#/components/schemas/Capture'
 *       404:
 *         description: Capture پیدا نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Capture پیدا نشد
 */

/**
 * @swagger
 * /captures/{id}:
 *   put:
 *     summary: Update a capture
 *     description: بروزرسانی اطلاعات یک capture مشخص
 *     tags: [Captures 🎥]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID capture
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Capture title
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: آپلود فایل جدید
 *               description:
 *                 type: string
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *               courseId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Capture updated successfully
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
 *                   example: Capture با موفقیت بروزرسانی شد
 *                 capture:
 *                   $ref: '#/components/schemas/Capture'
 *       404:
 *         description: Capture پیدا نشد
 *       400:
 *         description: خطای اعتبارسنجی یا تداخل عنوان
 */