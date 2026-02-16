/**
 * @swagger
 * tags:
 *   name: Baskets 🛒
 *   description: Basket management APIs
 */

/**
 * @swagger
 * /basket:
 *   post:
 *     summary: Create a new basket
 *     description: Create a basket for the logged-in user. User ID is retrieved from JWT token. You can optionally provide courseId and quantity.
 *     tags: [Baskets 🛒]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Basket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Basket'
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
 *     Basket:
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
 *         totalPrice:
 *           type: number
 *           format: float
 *           example: 0
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
 * /basket:
 *   get:
 *     summary: Get logged-in user's basket
 *     description: Retrieve the basket of the currently logged-in user. User ID is retrieved from JWT token.
 *     tags: [Baskets 🛒]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Basket retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Basket'
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
 *       404:
 *         description: Basket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket not found"
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
 * /basket/{itemId}:
 *   patch:
 *     summary: Update basket item quantity (increment / decrement)
 *     description: Increase or decrease quantity of a specific basket item for the logged-in user.
 *     tags: [Baskets 🛒]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the basket item
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [increment, decrement]
 *                 example: increment
 *     responses:
 *       200:
 *         description: Basket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket updated successfully"
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/Basket'
 *                     - type: object
 *                       properties:
 *                         deleted:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: Invalid action or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid action"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Basket item not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /basket/{itemId}:
 *   delete:
 *     summary: Remove a basket item
 *     description: Deletes a specific basket item of the logged-in user. User ID is retrieved from JWT token.
 *     tags: [Baskets 🛒]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the basket item to delete
 *         example: 5
 *     responses:
 *       200:
 *         description: Basket item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket item removed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deleted:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid itemId or request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "itemId is required"
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
 *       404:
 *         description: Basket item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Basket item not found"
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