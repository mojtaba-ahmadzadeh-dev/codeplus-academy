/**
 * @swagger
 * tags:
 *   name: RBAC 🛡️
 *   description: Role-Based Access Control APIs (Roles & Permissions)
 */

/**
 * @swagger
 * /rbac/create-permission:
 *   post:
 *     summary: Create a new permission
 *     description: |
 *       Create a new permission in the system.  
 *       create-permission define **what actions are possible** in the application  
 *       (e.g. create_user, delete_user, update_role).
 *     tags: [RBAC 🛡️]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "delete_user"
 *                 description: Unique permission name
 *               description:
 *                 type: string
 *                 example: "Allows deleting users"
 *                 description: Optional description for the permission
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 permission:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "delete_user"
 *                     description:
 *                       type: string
 *                       example: "Allows deleting users"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       409:
 *         description: Permission already exists
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
 *                   example: "Permission already exists"
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
