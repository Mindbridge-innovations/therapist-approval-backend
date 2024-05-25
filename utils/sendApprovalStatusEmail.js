// utils/sendApprovalStatusEmail.js
const sendEmail = require('./mailer');

const sendApprovalStatusEmail = async (email, firstName, approved, reason) => {
  const approvalWord = approved ? `<span style="color: green;">approved</span>` : `<span style="color: red;">rejected</span>`;
  const emailBody = {
    body: {
      name: firstName,
      intro: `Your application has been ${approvalWord}.`,
      action: {
        instructions: `Reason: ${reason}`
      },
      outro: "If you have any questions or require further information, please do not hesitate to contact us."
    }
  };

  const subject = `Your Application has been ${approved ? 'Approved' : 'Rejected'}`;

  // Send the email
  await sendEmail(email, subject, emailBody);
};

module.exports = sendApprovalStatusEmail;