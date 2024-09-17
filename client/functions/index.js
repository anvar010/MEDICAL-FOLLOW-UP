import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';

// Set up Mailtrap transport configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 587,
  auth: {
    user: functions.config().mailtrap.user,
    pass: functions.config().mailtrap.pass,
  },
});

// Define your function
exports.sendReminder = functions.pubsub.schedule('every 24 hours').onRun(async () => {
    const mailOptions = {
      from: 'your-email@example.com', // Replace with your sender email
      to: 'recipient@example.com', // Replace with recipient email
      subject: 'Reminder Notification',
      text: 'This is a reminder to check your tasks.',
      html: '<p>This is a reminder to check your tasks.</p>',
    };
  // Create a transporter object using Mailtrap
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587,
    auth: {
      user: functions.config().mailtrap.user,
      pass: functions.config().mailtrap.pass,
    },
  });

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent successfully');
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
});