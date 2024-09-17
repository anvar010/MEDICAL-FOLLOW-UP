import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import '../styles/style.css'; 

const PrescriptionParser = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFields = () => {
    return patientName && age && gender && contact && medication && dosage && schedule && startDate && endDate;
  };

  const parsePrescription = async () => {
    if (!validateFields()) {
      toast.error('All fields must be filled.'); // Error toast
      return;
    }

    try {
      // Check if profile already exists
      const profileQuery = query(
        collection(firestore, 'profiles'),
        where('contact', '==', contact)
      );
      const profileSnapshot = await getDocs(profileQuery);

      let profileId;

      if (profileSnapshot.empty) {
        // Create a new profile if none exists
        const profileData = { name: patientName, age, gender, contact };
        const profileRef = await addDoc(collection(firestore, 'profiles'), profileData);
        profileId = profileRef.id;
        console.log('Profile created:', profileId);
        toast.success('Profile created and prescription saved successfully!'); // Success toast
      } else {
        // Use the existing profile ID
        profileId = profileSnapshot.docs[0].id;
        console.log('Existing profile found:', profileId);
        toast.success('Prescription saved successfully!'); // Success toast
      }

      // Save the prescription with the profile ID
      const prescriptionData = {
        profileId,
        medication,
        dosage,
        schedule,
        startDate,
        endDate
      };

      await addDoc(collection(firestore, 'prescriptions'), prescriptionData);

      // Clear input after saving
      setPatientName('');
      setAge('');
      setGender('');
      setContact('');
      setMedication('');
      setDosage('');
      setSchedule('');
      setStartDate('');
      setEndDate('');
      setErrorMessage(''); // Clear any previous errors

    } catch (e) {
      console.error('Error saving prescription:', e);
      toast.error('Failed to save prescription.'); // Error toast
    }
  };

  return (
    <div className="container1">
      <div className="title-form1">
        <h2>Enter Prescription Details</h2>
      </div>
      <form className="student-form" onSubmit={(e) => { e.preventDefault(); parsePrescription(); }}>
        <div className="field-form">
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
        </div>
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
            Gender:
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Contact:
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Medication:
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Dosage:
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Schedule:
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="field-form">
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="button">
          <button type="submit" className="add">
            Parse Prescription
          </button>
        </div>
      </form>
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
};

export default PrescriptionParser;
