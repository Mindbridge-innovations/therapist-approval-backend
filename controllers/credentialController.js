// controllers/credentialController.js
const { uploadCredentials } = require('../utils/credentialUpload');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const uploadCredential = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('File received:', req.file);
    const userId = req.user.userId; // Assuming the user ID is attached to the request by authentication middleware
    const fileData = {
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype
    };

    const result = await uploadCredentials(userId, fileData);
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error uploading credentials: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadCredential, upload };