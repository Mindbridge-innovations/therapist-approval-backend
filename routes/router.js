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
router.post('/login', login);

// Credential upload route
router.post('/upload-credentials', authenticateToken, upload.single('file'), uploadCredential);

// Route to get therapist details including the credential file
router.get('/therapists',authenticateToken,checkAdmin,getAllTherapists);

// Route to update therapist approval status
router.post('/therapist-approval/:userId', authenticateToken, checkAdmin, updateTherapistApproval);

// Route to get user info
router.get('/user-info', authenticateToken, getUserInfo);


module.exports = router;