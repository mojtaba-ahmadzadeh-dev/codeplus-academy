/**
 * @swagger
 * tags:
 *   name: Orders 🧾
 *   description: Order management APIs
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create orders from the user's basket
 *     description: Create one or more orders based on the items in the logged-in user's basket. After creating the orders, the basket items are deactivated.
 *     tags: [Orders 🧾]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Orders created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders created successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       400:
 *         description: Basket is empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket is empty"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         courseId:
 *           type: integer
 *         quantity:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: number
 *           format: float
 *           example: 0
 *         status:
 *           type: string
 *           example: "pending"
 *         paymentStatus:
 *           type: string
 *           example: "unpaid"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         course:
 *           $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders of the logged-in user
 *     description: Retrieve all orders created by the logged-in user, including course details. Orders are sorted by creation date descending.
 *     tags: [Orders 🧾]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User orders retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         courseId:
 *           type: integer
 *         quantity:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: number
 *           format: float
 *           example: 0
 *         status:
 *           type: string
 *           example: "pending"
 *         paymentStatus:
 *           type: string
 *           example: "unpaid"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         course:
 *           $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Delete a specific order item
 *     description: Delete a specific order that belongs to the logged-in user.
 *     tags: [Orders 🧾]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order item successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order item successfully deleted"
 *       400:
 *         description: Invalid order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid order ID"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is not logged in"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found or does not belong to the user"
 */