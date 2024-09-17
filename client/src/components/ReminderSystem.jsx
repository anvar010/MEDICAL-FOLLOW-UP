import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import '../styles/style.css';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  
  // Fetch existing reminders from Firestore
  useEffect(() => {
    const fetchReminders = async () => {
      const remindersCollection = query(collection(firestore, 'reminders'));
      const querySnapshot = await getDocs(remindersCollection);
      const remindersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReminders(remindersData);
    };

    fetchReminders();
  }, []);
  
  
  const addReminder = async (patientId, reminderType, dateTime) => {
    try {
      await addDoc(collection(firestore, 'reminders'), {
        patientId,
        reminderType,
        dateTime,
      });
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <div className="reminder-container">
      <h2>Reminders</h2>
      {reminders.length > 0 ? (
        <ul>
          {reminders.map(reminder => (
            <li key={reminder.id}>
              {reminder.reminderType} - {new Date(reminder.dateTime).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reminders found.</p>
      )}
    </div>
  );
};

export default Reminders;
