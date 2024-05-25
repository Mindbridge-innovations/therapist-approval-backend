// routes/router.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const { authenticateToken } = require('../middleware/authenticateToken');
const { uploadCredential, upload } = require('../controllers/credentialController');
const { getAllTherapists } = require('../controllers/therapistController');
const { checkAdmin } = require('../middleware/checkAdmin');

// Login route
router.post('/login', login);

// Credential upload route
router.post('/upload-credentials', authenticateToken, upload.single('file'), uploadCredential);

// Route to get therapist details including the credential file
router.get('/therapists',checkAdmin,getAllTherapists);


module.exports = router;