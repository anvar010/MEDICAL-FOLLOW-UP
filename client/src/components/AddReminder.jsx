import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { scheduleAppointmentReminder } from '../reminderService'; // Import the reminder scheduling function

const AddAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [patientEmail, setPatientEmail] = useState(''); // Added email field
  const [errorMessage, setErrorMessage] = useState('');

  const validateFields = () => {
    return patientName && appointmentDate && appointmentTime && purpose && patientEmail;
  };

  const addAppointment = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setErrorMessage('All fields must be filled.');
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'appointments'), {
        patientName,
        appointmentDate,
        appointmentTime,
        purpose,
        patientEmail, // Store email in Firestore
      });

      console.log('Appointment added successfully');
      setErrorMessage('');
      // Schedule reminder
      scheduleAppointmentReminder(docRef.id, appointmentDate, appointmentTime, patientEmail);
      // Clear fields
      setPatientName('');
      setAppointmentDate('');
      setAppointmentTime('');
      setPurpose('');
      setPatientEmail('');
    } catch (e) {
      console.error('Error adding appointment:', e);
      setErrorMessage('Failed to add appointment.');
    }
  };

  return (
    <div className="container1">
      <div className="title-form1">
        <h2>Enter Appointment Details</h2>
      </div>
      <form className="student-form" onSubmit={addAppointment}>
        <div className="field-form">
          <label>
            Patient Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Appointment Date:
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Appointment Time:
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Purpose:
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Patient Email:
            <input
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="button">
          <button type="submit" className="add">
            Add Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
