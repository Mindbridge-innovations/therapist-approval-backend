// controllers/approvalController.js
const { db } = require('../config/firebaseConfig');
const { updateTherapistApprovalStatus } = require('../utils/approvalUtils');
const { sendApprovalStatusEmail } = require('../utils/sendApprovalStatusEmail');

const updateTherapistApproval = async (req, res) => {
  const { userId } = req.params;
  const { approve, reason } = req.body;
  const adminId = req.user.userId;

  try {
    // Fetch therapist details from the users table
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val();

    if (!userData || userData.role !== 'therapist') {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    // Update the therapist's approval status
    await updateTherapistApprovalStatus(userId, approve, adminId, reason);

    // Send an email to the therapist
    await sendApprovalStatusEmail(userData.email, userData.firstName, approve, reason);

    res.status(200).json({ message: `Therapist has been ${approve ? 'approved' : 'rejected'}` });
  } catch (error) {
    console.error(`Error updating therapist approval status: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateTherapistApproval };