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
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/create-role:
 *   post:
 *     summary: Create a new role
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
 *                 example: "admin"
 *               description:
 *                 type: string
 *                 example: "Administrator role with all permissions"
 *     responses:
 *       201:
 *         description: Role created successfully
 *       409:
 *         description: Role already exists
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/assign-permission-to-role:
 *   post:
 *     summary: Assign permissions to a role
 *     tags: [RBAC 🛡️]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionIds
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Permissions successfully assigned to the role
 *       404:
 *         description: Role or permission not found
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/assign-role-to-user:
 *   post:
 *     summary: Assign roles to a user
 *     tags: [RBAC 🛡️]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleIds
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 5
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: Roles successfully assigned to user
 *       404:
 *         description: User or role not found
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/roles:
 *   get:
 *     summary: Get all roles
 *     description: |
 *       Retrieve a list of all roles in the system.
 *       Only users with admin role can access this endpoint.
 *     tags: [RBAC 🛡️]
 *     security:
 *       - bearerAuth: []   # اگر JWT استفاده می‌کنید
 *     responses:
 *       200:
 *         description: Roles fetched successfully
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
 *                   example: "Roles fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["admin", "user", "moderator"]
 *       401:
 *         description: Unauthorized, access token missing or invalid
 *       403:
 *         description: Forbidden, user does not have permission
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/permissions:
 *   get:
 *     summary: Get all permissions
 *     description: |
 *       Retrieve a list of all permissions in the system.
 *       Only users with admin role can access this endpoint.
 *     tags: [RBAC 🛡️]
 *     security:
 *       - bearerAuth: []   # اگر JWT استفاده می‌کنید
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
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
 *                   example: "Permissions fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["create_user", "delete_user", "update_role"]
 *       401:
 *         description: Unauthorized, access token missing or invalid
 *       403:
 *         description: Forbidden, user does not have permission
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/role/{id}:
 *   put:
 *     summary: Update a role
 *     description: Update name or description of an existing role.
 *     tags: [RBAC 🛡️]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "moderator"
 *               description:
 *                 type: string
 *                 example: "Updated description for moderator role"
 *     responses:
 *       200:
 *         description: Role updated successfully
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
 *                   example: "Role updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       404:
 *         description: Role not found
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/permission/{id}:
 *   put:
 *     summary: Update a permission
 *     description: Update name or description of an existing permission.
 *     tags: [RBAC 🛡️]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "delete_user"
 *                 description: Updated permission name
 *               description:
 *                 type: string
 *                 example: "Allows deleting users"
 *                 description: Updated description
 *     responses:
 *       200:
 *         description: Permission updated successfully
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
 *                   example: "Permission updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       404:
 *         description: Permission not found
 *       409:
 *         description: Permission name already exists
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rbac/role/{id}:
 *   delete:
 *     summary: Delete a role
 *     description: Delete an existing role by its ID. This will also remove its assignment from all users.
 *     tags: [RBAC 🛡️]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID to delete
 *     responses:
 *       200:
 *         description: Role deleted successfully
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
 *                   example: "نقش با موفقیت حذف شد"
 *       404:
 *         description: Role not found
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
