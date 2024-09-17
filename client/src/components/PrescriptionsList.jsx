import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import '../styles/style.css';

const PrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
       
        const prescriptionsQuerySnapshot = await getDocs(collection(firestore, 'prescriptions'));
        const prescriptionsData = prescriptionsQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      
        const prescriptionsWithPatientNames = await Promise.all(prescriptionsData.map(async (prescription) => {
          if (!prescription.profileId) {
            return {
              ...prescription,
              patientName: 'Unknown'
            };
          }

          try {
            const profileDocRef = doc(firestore, 'profiles', prescription.profileId);
            const profileDoc = await getDoc(profileDocRef);

            if (profileDoc.exists()) {
              return {
                ...prescription,
                patientName: profileDoc.data().name
              };
            } else {
              return {
                ...prescription,
                patientName: 'Unknown'
              };
            }
          } catch (profileError) {
            console.error(`Error fetching profile ${prescription.profileId}:`, profileError);
            return {
              ...prescription,
              patientName: 'Error fetching name'
            };
          }
        }));

        setPrescriptions(prescriptionsWithPatientNames);
      } catch (error) {
        console.error('Error fetching prescriptions or profiles:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="box">
      <h1>Prescription List</h1>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map(prescription => (
          <li key={prescription.id}>
            <h3>{prescription.patientName}</h3>
            <p>Medication: {prescription.medication}</p>
            <p>Dosage: {prescription.dosage}</p>
            <p>Schedule: {prescription.schedule}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionsList;
