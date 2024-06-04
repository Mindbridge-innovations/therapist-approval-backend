// routes/router.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const { authenticateToken } = require('../middleware/authenticateToken');
const { uploadCredential, upload } = require('../controllers/credentialController');
const { getAllTherapists } = require('../controllers/therapistController');
const { updateTherapistApproval } = require('../controllers/approvalController');
const { checkAdmin } = require('../middleware/checkAdmin');
const { getUserInfo } = require('../controllers/userController');

// Login route
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT for accessing protected routes
 *                 userData:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Authentication failed
 */
router.post('/login', login);

// Credential upload route
/**
 * @swagger
 * /upload-credentials:
 *   post:
 *     summary: Upload user credentials
 *     tags: [Credentials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Credential file to upload
 *     responses:
 *       201:
 *         description: Credentials uploaded successfully
 *       500:
 *         description: Server error
 */
router.post('/upload-credentials', authenticateToken, upload.single('file'), uploadCredential);

// Route to get therapist details including the credential file
/**
 * @swagger
 * /therapists:
 *   get:
 *     summary: Retrieve all therapists
 *     tags: [Therapists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all therapists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Therapist'
 *       403:
 *         description: Access denied
 */
router.get('/therapists',authenticateToken,checkAdmin,getAllTherapists);

// Route to update therapist approval status
/**
 * @swagger
 * /therapist-approval/{userId}:
 *   post:
 *     summary: Update therapist approval status
 *     tags: [Approval]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID of the therapist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approve:
 *                 type: boolean
 *                 description: Approval status
 *               reason:
 *                 type: string
 *                 description: Reason for approval/rejection
 *     responses:
 *       200:
 *         description: Approval status updated
 *       404:
 *         description: Therapist not found
 *       500:
 *         description: Server error
 */
router.post('/therapist-approval/:userId', authenticateToken, checkAdmin, updateTherapistApproval);

// Route to get user info
/**
 * @swagger
 * /user-info:
 *   get:
 *     summary: Get user information
 *     tags: [User Info]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get('/user-info', authenticateToken, getUserInfo);


module.exports = router;