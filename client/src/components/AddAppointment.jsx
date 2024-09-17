import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const AddAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [purpose, setPurpose] = useState('');

  const validateFields = () => {
    return patientName && appointmentDate && appointmentTime && purpose;
  };

  const checkIfAppointmentExists = async () => {
    const appointmentsRef = collection(firestore, 'appointments');
    const q = query(
      appointmentsRef,
      where('patientName', '==', patientName),
      where('appointmentDate', '==', appointmentDate),
      where('appointmentTime', '==', appointmentTime)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if an appointment already exists
  };

  const addAppointment = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!validateFields()) {
      toast.error('All fields must be filled.');
      return;
    }

    try {
      // Check if the appointment already exists
      const appointmentExists = await checkIfAppointmentExists();
      if (appointmentExists) {
        toast.error('Appointment already exists for this time and date.');
        return;
      }

      // If no duplicate found, add the new appointment
      await addDoc(collection(firestore, 'appointments'), {
        patientName,
        appointmentDate,
        appointmentTime,
        purpose,
      });

      toast.success('Appointment added successfully!');

      // Clear fields after successful submission
      setPatientName('');
      setAppointmentDate('');
      setAppointmentTime('');
      setPurpose('');

    } catch (e) {
      console.error('Error adding appointment:', e);
      toast.error('Failed to add appointment.');
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
        <div className="button">
          <button type="submit" className="add">
            Add Appointment
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddAppointment;
