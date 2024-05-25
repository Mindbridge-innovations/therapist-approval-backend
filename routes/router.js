// routes/router.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const { authenticateToken } = require('../middleware/authenticateToken');
const { uploadCredential, upload } = require('../controllers/credentialController');

// Login route
router.post('/login', login);

// Credential upload route
router.post('/upload-credentials', authenticateToken, upload.single('file'), uploadCredential);


module.exports = router;