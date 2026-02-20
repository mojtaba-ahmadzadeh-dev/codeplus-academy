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
 *       - Priority and status are optional; default values will be applied if not provided.
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