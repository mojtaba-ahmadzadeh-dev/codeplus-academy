/**
 * @swagger
 * tags:
 *   name: Authentication 🔐
 *   description: User registration, OTP verification, and authentication APIs
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP to a user
 *     description: |
 *       Register a new user  
 *       - If it is the first user, they will get the ADMIN role  
 *       - Otherwise, the user will get the USER role  
 *       - The generated OTP will be sent to the user's mobile number
 *     tags: [Authentication 🔐]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "09123456789"
 *                 description: User's mobile number (must start with 0)
 *     responses:
 *       201:
 *         description: OTP sent successfully
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
 *                   example: OTP sent successfully
 *       400:
 *         description: Invalid mobile number
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
 *                   example: Mobile number must start with 0 and be 10 to 11 digits
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
