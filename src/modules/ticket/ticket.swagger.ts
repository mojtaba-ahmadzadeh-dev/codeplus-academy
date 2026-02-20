/**
 * @swagger
 * tags:
 *   name: Ticket 🎫
 *   description: APIs related to ticket creation and management
 */

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: |
 *       Create a new support ticket for the currently authenticated user.  
 *       - UserId is automatically taken from the access token, no need to send it.  
 *       - Requires title and description.  
 *       - Priority, status, and subdepartment are optional.
 *     tags: [Ticket 🎫]
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
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cannot login to account"
 *                 description: The title of the ticket
 *               description:
 *                 type: string
 *                 example: "I am unable to login with my credentials"
 *                 description: Detailed description of the issue
 *               subdepartment:
 *                 type: string
 *                 example: "Login Issues"
 *                 description: The subdepartment of the ticket (optional)
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *                 description: Priority of the ticket
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending, accepted, processing, paid, unPaid, cancelled]
 *                 example: "pending"
 *                 description: Current status of the ticket
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Cannot login to account"
 *                     description:
 *                       type: string
 *                       example: "I am unable to login with my credentials"
 *                     subdepartment:
 *                       type: string
 *                       example: "Login Issues"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     priority:
 *                       type: string
 *                       example: "medium"
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tickets/user:
 *   get:
 *     summary: Get tickets of the current user
 *     description: |
 *       Retrieve all tickets created by the currently authenticated user.
 *       Requires authentication via bearer token.
 *     tags: [Ticket 🎫]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Cannot login to account"
 *                       description:
 *                         type: string
 *                         example: "I am unable to login with my credentials"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       priority:
 *                         type: string
 *                         example: "medium"
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tickets/admin:
 *   get:
 *     summary: Get all tickets (Admin)
 *     description: |
 *       Retrieve all tickets in the system.  
 *       Requires admin authentication via bearer token.
 *     tags: [Ticket 🎫]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Cannot login to account"
 *                       description:
 *                         type: string
 *                         example: "I am unable to login with my credentials"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       priority:
 *                         type: string
 *                         example: "medium"
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (if not admin)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     description: Retrieve a ticket by its ID. Users can only access their own tickets unless they are admin.
 *     tags: [Ticket 🎫]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Ticket found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 ticket:
 *                   $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Invalid ticket ID
 *       403:
 *         description: Forbidden (user cannot access other user's ticket)
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     description: |
 *       Deletes a ticket by its ID.  
 *       - Users can only delete their own tickets.  
 *       - Admins can delete any ticket.  
 *       Requires authentication via bearer token.
 *     tags: [Ticket 🎫]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID to delete
 *     responses:
 *       200:
 *         description: Ticket successfully deleted
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
 *                   example: "تیکت با موفقیت حذف شد"
 *       400:
 *         description: Invalid ticket ID or ticket not found
 *       401:
 *         description: Unauthorized (user not logged in)
 *       403:
 *         description: Forbidden (user cannot delete other user's ticket)
 *       500:
 *         description: Internal server error
 */