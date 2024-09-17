import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import '../styles/style.css';

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientDetails, setPatientDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      if (!searchTerm) {
        setPatientDetails([]);
        setError('');
        return;
      }

      setError('');
      setPatientDetails([]);

      try {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        const q = query(collection(firestore, 'profiles'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const patients = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(patient => 
              (patient.name && patient.name.toLowerCase().includes(normalizedSearchTerm)) || 
              (patient.contact && patient.contact.includes(searchTerm))
            );
          if (patients.length > 0) {
            setPatientDetails(patients);
          } else {
            setError('No patients found.');
          }
        } else {
          setError('No patients found.');
        }
      } catch (e) {
        console.error('Error fetching patient details:', e);
        setError('Failed to fetch patient details.');
      }
    };

    fetchPatients();
  }, [searchTerm]);

  return (
    <div className="patient-history-container">
      <h2 className="patient-history-heading">Search Patient</h2>
      <input
        type="text"
        className="patient-history-input"
        placeholder="Enter patient name or contact number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p className="patient-history-error">{error}</p>}
      {searchTerm && patientDetails.length > 0 && (
        <div className="patient-history-details">
          {patientDetails.map(patient => (
            <div key={patient.id} className="patient-history-detail">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Contact:</strong> {patient.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
