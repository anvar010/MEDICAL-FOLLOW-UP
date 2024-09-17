// server/scheduler.js
const cron = require('node-cron');
const admin = require('./firebaseAdmin');

async function fetchPrescriptionsDue() {
  
  return [
    {
      fcmToken: 'f96f90Zi1oJOfm5hk32Nsz:APA91bF3GBp2FKqQC4UmsQBj0LvU_STKLTVvSqnWVM-IoS-KIPej1VvzFc_3Cqjv2vLi8z2RpI-RfptevBz9MYqOmR8bBG-ZZkUmPIiWGXcqP8ZL5q-xpKbycE1vSgkjXovFu0q3jMG8',
      medication: 'Medication Name',
    },
  ];
}

cron.schedule('*/3 * * * *', async () => { 
  try {
    const prescriptions = await fetchPrescriptionsDue();

    prescriptions.forEach(async (prescription) => {
      const message = {
        notification: {
          title: 'Prescription Reminder',
          body: `Time to take your medicine: ${prescription.medication}`,
        },
        token: prescription.fcmToken,
      };

      await admin.messaging().send(message);
      console.log('Notification sent:', message);
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
});
