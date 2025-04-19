const SibApiV3Sdk = require("sib-api-v3-sdk");

// Configure API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

/**
 * Sends a password reset email to the user
 * @param {string} to - Recipient email address
 * @param {string} resetUrl - URL with reset token
 * @returns {Promise} - Response from email API
 */
const sendPasswordResetEmail = async (to, resetUrl) => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_FROM_NAME,
    };

    const sendSmtpEmail = {
      sender,
      to: [{ email: to }],
      subject: "Starilum - Password Reset",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #07ff00; text-align: center;">Reset Your Password</h1>
          <p>You requested a password reset. Click the button below to set a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #07ff00; 
                      color: #000; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 4px;
                      font-weight: bold;
                      display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link is valid for 1 hour.</p>
          <hr>
          <p style="font-size: 12px; color: #666; text-align: center;">
            &copy; Starilum Games. All rights reserved.
          </p>
        </div>
      `,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
