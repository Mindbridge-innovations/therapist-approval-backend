// controllers/credentialController.js
const { db } = require('../config/firebaseConfig');
const { uploadCredentials } = require('../utils/credentialUpload');
const sendCredentialSubmissionEmail  = require('../utils/sendCredentialSubmissionEmail');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const uploadCredential = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is set by the authenticateToken middleware

    // Fetch user details from the users table
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val();

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fileData = {
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype
    };

    const result = await uploadCredentials(userId, fileData);
    await sendCredentialSubmissionEmail(userData.email, userData.firstName);

    res.status(201).json(result);
  } catch (error) {
    console.error(`Error uploading credentials: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadCredential, upload };