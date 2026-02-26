/**
 * @swagger
 * tags:
 *   name: Support 💬
 *   description: APIs for managing support chat namespaces
 */

/**
 * @swagger
 * /support/namespace/create:
 *   post:
 *     summary: Create a new namespace
 *     description: |
 *       Create a new namespace for support system  
 *       - The endpoint must be unique  
 *       - After creation, clients can connect to this namespace
 *     tags: [Support 💬]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - endpoint
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Support Chat"
 *                 description: Namespace title
 *               endpoint:
 *                 type: string
 *                 example: "support"
 *                 description: Unique namespace endpoint (without /)
 *     responses:
 *       201:
 *         description: Namespace created successfully
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
 *                   example: Namespace created successfully
 *       409:
 *         description: Namespace already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Namespace with this endpoint already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /support/namespace:
 *   get:
 *     summary: Get all namespaces
 *     description: Retrieve list of all support chat namespaces
 *     tags: [Support 💬]
 *     responses:
 *       200:
 *         description: Namespaces retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 StatusCodes:
 *                   type: integer
 *                   example: 200
 *                 namespaces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       endpoint:
 *                         type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /support/namespace/delete/{id}:
 *   delete:
 *     summary: Delete a namespace
 *     description: Remove a namespace by its ID
 *     tags: [Support 💬]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Namespace ID to delete
 *     responses:
 *       200:
 *         description: Namespace deleted successfully
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
 *                   example: Namespace deleted successfully
 *       404:
 *         description: Namespace not found
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
 *                   example: Namespace not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /support/room/create:
 *   post:
 *     summary: Create a new room
 *     description: |
 *       Create a support room with optional image upload  
 *       - Room automatically creates conversation  
 *       - Image is optional  
 *       - No need to send conversationId
 *     tags: [Support 💬]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "General Support"
 *                 description: Room name
 *               description:
 *                 type: string
 *                 example: "Room for general questions"
 *                 description: Room description (optional)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Room image (optional)
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /support/room:
 *   get:
 *     summary: Get all rooms
 *     description: Retrieve all support rooms
 *     tags: [Support 💬]
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 rooms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /support/room/delete/{id}:
 *   delete:
 *     summary: Delete a chat room
 *     description: Delete a room by its ID
 *     tags: [Support 💬]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room successfully deleted
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
 *                   example: Room successfully deleted
 *       404:
 *         description: Room not found
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
 *                   example: Room not found
 *       500:
 *         description: Internal server error
 */