import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendReminders = functions.pubsub.schedule('0 21 * * 0,3').timeZone('America/New_York').onRun(async (context) => {
  const message = {
    notification: {
      title: 'Wash Reminder',
      body: 'Don\'t forget to wash your hair today!'
    },
    topic: 'wash_reminders'
  };

  try {
    await admin.messaging().send(message);
    console.log('Reminder sent successfully');
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
});