// controllers/credentialController.js
const { uploadCredentials } = require('../utils/credentialUpload');
const { sendCredentialSubmissionEmail } = require('../utils/sendCredentialSubmissionEmail');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const uploadCredential = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userFirstName = req.user.firstName;
    const userEmail = req.user.email;

    const fileData = {
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype
    };

    const result = await uploadCredentials(userId, fileData);
    await sendCredentialSubmissionEmail(userEmail, userFirstName);
    
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error uploading credentials: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadCredential, upload };