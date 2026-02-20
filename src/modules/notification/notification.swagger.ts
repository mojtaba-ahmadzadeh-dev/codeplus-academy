/**
 * @swagger
 * tags:
 *   name: Notifications 🔔
 *   description: Notification management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "پرداخت موفق"
 *         message:
 *           type: string
 *           example: "سفارش شما با موفقیت ثبت شد"
 *         type:
 *           type: string
 *           enum: [INFO, SUCCESS, WARNING, ERROR]
 *           example: INFO
 *         read:
 *           type: boolean
 *           example: false
 *         userId:
 *           type: integer
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     description: |
 *       Creates a notification for the currently authenticated user.
 *       - Requires Bearer Token authentication
 *       - `userId` is automatically extracted from JWT
 *       - `read` is automatically set to false
 *     tags: [Notifications 🔔]
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
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *                 example: "پرداخت موفق"
 *               message:
 *                 type: string
 *                 example: "سفارش شما با موفقیت ثبت شد"
 *               type:
 *                 type: string
 *                 enum: [INFO, SUCCESS, WARNING, ERROR]
 *                 example: INFO
 *                 description: Notification type (optional, default is INFO)
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (Missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get notifications for the current user
 *     description: |
 *       Returns a list of notifications for the authenticated user.
 *       Supports pagination with `limit` and `offset` query parameters.
 *     tags: [Notifications 🔔]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of notifications to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of notifications to skip
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notifications fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */