import nodemailer from 'nodemailer';

// Setup nodemailer with Mailtrap
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: '1fa9228d1af4f0', // Replace with Mailtrap username
    pass: '281ce07bf572a1'// Replace with Mailtrap password1fa9228d1af4f0
    // VITE_USER_PASS=281ce07bf572a1
  },
});

// Function to send a test email
const sendTestEmail = () => {
  const mailOptions = {
    from: 'your-email@example.com', // Replace with your email
    to: 'test-recipient@example.com', // Replace with a test recipient email
    subject: 'Test Email',
    text: 'This is a test email to check if the email configuration is working.',
    html: '<p>This is a <strong>test email</strong> to check if the email configuration is working.</p>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending test email:', error);
    } else {
      console.log('Test email sent:', info.response);
    }
  });
};

// Send the test email
sendTestEmail();
// setTimeout(() => {
//     sendTestEmail();
//   }, 2 * 60 * 1000); // 2 minutes