// controllers/therapistController.js
const { db } = require('../config/firebaseConfig');

const getTherapistDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val();

    if (!userData || userData.role !== 'therapist') {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    const credentialsRef = db.ref(`credentials`).orderByChild('userId').equalTo(userId);
    const credentialsSnapshot = await credentialsRef.once('value');
    const credentialsData = credentialsSnapshot.val();

    let fileUrl = null;
    if (credentialsData) {
      // Assuming each user has only one credential file
      const credentialKey = Object.keys(credentialsData)[0];
      fileUrl = credentialsData[credentialKey].fileUrl;
    }

    const response = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      isApproved: userData.isApproved,
      fileUrl: fileUrl
    };

    res.json(response);
  } catch (error) {
    console.error(`Error fetching therapist details: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTherapistDetails };