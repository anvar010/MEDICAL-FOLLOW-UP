const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Update with the correct path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Example function to retrieve prescription details
async function getPrescriptionDetails(prescriptionId) {
  // Replace this with your actual data retrieval logic
  // For now, returning dummy data
  return {
    patientName: 'John Doe',
    medication: 'Aspirin',
    dosage: '500 mg',
    schedule: 'Twice a day',
    startDate: '2024-09-16',
    endDate: '2024-10-16',
  };
}

// Function to send notification
async function sendNotification(prescriptionId, deviceToken) {
  try {
    const prescription = await getPrescriptionDetails(prescriptionId);

    const message = {
      notification: {
        title: `Reminder: ${prescription.medication} for ${prescription.patientName}`,
        body: `You have a ${prescription.dosage} dose of ${prescription.medication} scheduled ${prescription.schedule}. Start date: ${prescription.startDate}, End date: ${prescription.endDate}.`,
      },
      token: deviceToken, // Replace with the actual device token
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
    // Additional logging or actions
  }
}

// Example usage
const prescriptionId = 'your-prescription-id';
const deviceToken = 'f96f90Zi1oJOfm5hk32Nsz:APA91bF3GBp2FKqQC4UmsQBj0LvU_STKLTVvSqnWVM-IoS-KIPej1VvzFc_3Cqjv2vLi8z2RpI-RfptevBz9MYqOmR8bBG-ZZkUmPIiWGXcqP8ZL5q-xpKbycE1vSgkjXovFu0q3jMG8'; 

sendNotification(prescriptionId, deviceToken);
