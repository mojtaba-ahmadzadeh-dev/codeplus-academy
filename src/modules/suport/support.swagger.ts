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