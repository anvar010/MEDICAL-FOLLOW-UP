import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/style.css';

const AddProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [medications, setMedications] = useState('');
  const [appointmentHistory, setAppointmentHistory] = useState('');

  const validateFields = () => {
    return (
      name &&
      age &&
      gender &&
      contact &&
      medicalHistory &&
      allergies &&
      address &&
      dateOfBirth &&
      emergencyContact &&
      insuranceInfo &&
      medications &&
      appointmentHistory
    );
  };

  const saveProfile = async () => {
    if (!validateFields()) {
      toast.error('All fields must be filled.');
      return;
    }

    const profileData = {
      name,
      age,
      gender,
      contact,
      medicalHistory,
      allergies,
      address,
      dateOfBirth,
      emergencyContact,
      insuranceInfo,
      medications,
      appointmentHistory,
    };

    try {
      await addDoc(collection(firestore, 'profiles'), profileData);
      toast.success('Profile saved successfully!');

      setName('');
      setAge('');
      setGender('');
      setContact('');
      setMedicalHistory('');
      setAllergies('');
      setAddress('');
      setDateOfBirth('');
      setEmergencyContact('');
      setInsuranceInfo('');
      setMedications('');
      setAppointmentHistory('');
    } catch (e) {
      console.error('Error saving profile:', e);
      toast.error('Failed to save profile.');
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Add Patient Profile</h2>
      <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
        <div className="profile-form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className='drop' required>
            <option value="" className='drop'>Select Gender</option>
            <option value="Male" className='drop'>Male</option>
            <option value="Female" className='drop'>Female</option>
            <option value="Other" className='drop'>Other</option>
          </select>
        </div>
        <div className="profile-form-group">
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Medical History:</label>
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Allergies:</label>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Emergency Contact:</label>
          <input
            type="text"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Insurance Info:</label>
          <input
            type="text"
            value={insuranceInfo}
            onChange={(e) => setInsuranceInfo(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Medications:</label>
          <textarea
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Appointment History:</label>
          <textarea
            value={appointmentHistory}
            onChange={(e) => setAppointmentHistory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="profile-form-button">Save Profile</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddProfile;
