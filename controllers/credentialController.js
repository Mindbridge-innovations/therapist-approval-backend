// controllers/credentialController.js
const { db } = require('../config/firebaseConfig');
const sendCredentialSubmissionEmail = require('../utils/sendCredentialSubmissionEmail');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const axios = require('axios');
const FormData = require('form-data');
const pinataJWT = 'PASTE_YOUR_PINATA_JWT'; // Replace with your actual Pinata JWT

const uploadCredential = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val();

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Extract the filename from the uploaded file
    const filename = req.file.originalname;

    // Create form data for Pinata API
    const formData = new FormData();
    formData.append('file', req.file.buffer, filename);

    const pinataMetadata = JSON.stringify({
      name: filename,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append('pinataOptions', pinataOptions);

    // Upload file to Pinata
    const result = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          ...formData.getHeaders(),
        },
      }
    );

    // Store the IPFS hash in your database
    await db.ref('credentials').push({
      userId: userId,
      fileHash: result.data.IpfsHash,
      uploadedAt: new Date().toISOString(),
    });

    await sendCredentialSubmissionEmail(userData.email, userData.firstName);

    res.status(201).json({ success: true, message: 'Credentials uploaded successfully', credentialId: result.data.IpfsHash });
  } catch (error) {
    console.error(`Error uploading credentials: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadCredential, upload };
