// controllers/userController.js
const { db } = require('../config/firebaseConfig');

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;  // Assuming userId is set by the authenticateToken middleware

  try {
    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Selectively send user information that is safe to store in local storage
    const userInfo = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      isApproved: userData.isApproved
    };

    res.json(userInfo);
  } catch (error) {
    console.error(`Error fetching user info: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserInfo };