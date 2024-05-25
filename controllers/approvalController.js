// controllers/approvalController.js
const { updateTherapistApprovalStatus } = require('../utils/approvalUtils');

const updateTherapistApproval = async (req, res) => {
  const { userId } = req.params;
  const { approve, reason } = req.body;  // `approve` is a boolean, `reason` is a string
  const adminId = req.user.userId;  // Assuming the admin's user ID is attached to the request

  try {
    const result = await updateTherapistApprovalStatus(userId, approve, adminId, reason);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error updating therapist approval status: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateTherapistApproval };