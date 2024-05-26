const sendEmail = require('./mailer');

const sendCredentialSubmissionEmail = async (email, firstName) => {
  const emailBody = {
    body: {
      name: firstName,
      intro: "Thank you for submitting your credentials to MindBridge.",
      action: {
        instructions: "Your credentials are currently under review. We will notify you once the review process is complete.",
        button: {
          color: '#22BC66', // Optional: default is #22BC66
          text: 'View your submission',
          link: 'https://example.com/your-submission' // Example link, update with actual link if needed
        }
      },
      outro: "If you have any questions or need assistance, feel free to reply to this email."
    }
  };

  const subject = "Credential Submission Confirmation";

  // Send the email
  await sendEmail(email, subject, emailBody);
};

module.exports = sendCredentialSubmissionEmail;
