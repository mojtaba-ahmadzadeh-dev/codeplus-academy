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