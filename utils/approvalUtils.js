// utils/approvalUtils.js
const { db } = require('../config/firebaseConfig');

const updateTherapistApprovalStatus = async (userId, approve, adminId, reason) => {
  const userRef = db.ref(`users/${userId}`);
  const userSnapshot = await userRef.once('value');
  const userData = userSnapshot.val();

  if (!userData || userData.role !== 'therapist') {
    throw new Error('Therapist not found');
  }

  // Update the therapist's approval status
  await userRef.update({ isApproved: approve });

  // Log the approval/rejection in the ApprovalStatus table
  const approvalStatusRef = db.ref('ApprovalStatus').push();
  await approvalStatusRef.set({
    therapistId: userId,
    adminId: adminId,
    approved: approve,
    reason: reason,
    timestamp: new Date().toISOString()
  });

  return { message: `Therapist has been ${approve ? 'approved' : 'rejected'}` };
};

module.exports = { updateTherapistApprovalStatus };