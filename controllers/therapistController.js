// controllers/therapistController.js
const { db } = require('../config/firebaseConfig');

const getAllTherapists = async (req, res) => {
  try {
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();
    const therapists = [];

    for (const userId in users) {
      const user = users[userId];
      if (user.role === 'therapist') {
        // Fetch credentials for each therapist
        const credentialsRef = db.ref('credentials').orderByChild('userId').equalTo(userId);
        const credentialsSnapshot = await credentialsRef.once('value');
        const credentialsData = credentialsSnapshot.val();
        let fileUrl = null;

        if (credentialsData) {
          const credentialKey = Object.keys(credentialsData)[0];
          fileUrl = credentialsData[credentialKey].fileUrl;
        }

        therapists.push({
          userId: userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isApproved: user.isApproved,
          fileUrl: fileUrl
        });
      }
    }

    res.json(therapists);
  } catch (error) {
    console.error(`Error fetching therapists: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTherapists };