import schedule from 'node-schedule';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: '1fa9228d1af4f0', 
    pass: '281ce07bf572a1', 
  },
});


const sendReminderEmail = (email, purpose, appointmentDate, appointmentTime) => {
  const mailOptions = {
    from: 'doctor@example.com',
    to: email,
    subject: `Reminder for Your Appointment`,
    text: `You have an appointment scheduled for ${appointmentDate} at ${appointmentTime}. Purpose: ${purpose}.`,
    html: `<p>You have an appointment scheduled for <strong>${appointmentDate} at ${appointmentTime}</strong>.</p>
           <p>Purpose: <strong>${purpose}</strong></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reminder email:', error);
    } else {
      console.log('Reminder email sent:', info.response);
    }
  });
};


export const scheduleAppointmentReminder = async (appointmentId, appointmentDate, appointmentTime, patientEmail) => {
  try {
   
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}+04:00`);
    const reminderTime = new Date(appointmentDateTime.getTime() - 10 * 60 * 1000); // 10 minutes before

    console.log('Appointment DateTime:', appointmentDateTime);
    console.log('Reminder Time:', reminderTime);

   
    schedule.scheduleJob(reminderTime, () => {
      console.log('Sending reminder for appointment:', appointmentId);
      sendReminderEmail(patientEmail, 'Appointment', appointmentDate, appointmentTime);
    });

    console.log('Reminder scheduled successfully');
  } catch (error) {
    console.error('Error scheduling reminder:', error);
  }
};
