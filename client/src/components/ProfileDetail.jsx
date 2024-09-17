import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import '../styles/style.css';

const ProfileDetail = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adherence, setAdherence] = useState([]);
  const [sideEffects, setSideEffects] = useState([]);

  useEffect(() => {
    const fetchProfileAndData = async () => {
      setLoading(true);

      try {
        // Fetch the profile details
        const profileDoc = doc(firestore, 'profiles', profileId);
        const profileSnapshot = await getDoc(profileDoc);

        if (profileSnapshot.exists()) {
          const profileData = profileSnapshot.data();
          setProfile(profileData);
          console.log('Profile data:', profileData);

          // Fetch the prescriptions based on the profileId
          const prescriptionsQuery = query(
            collection(firestore, 'prescriptions'),
            where('profileId', '==', profileId)
          );
          const prescriptionsSnapshot = await getDocs(prescriptionsQuery);
          const prescriptionsData = prescriptionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPrescriptions(prescriptionsData);
          console.log('Prescriptions data:', prescriptionsData);

          // Fetch adherence records based on the profileId
          const adherenceQuery = query(
            collection(firestore, 'adherence'),
            where('userId', '==', profileId)
          );
          const adherenceSnapshot = await getDocs(adherenceQuery);
          const adherenceData = adherenceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAdherence(adherenceData);
          console.log('Adherence data:', adherenceData);

          // Fetch side effects records based on the profileId
          const sideEffectsQuery = query(
            collection(firestore, 'sideEffects'),
            where('userId', '==', profileId)
          );
          const sideEffectsSnapshot = await getDocs(sideEffectsQuery);
          const sideEffectsData = sideEffectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSideEffects(sideEffectsData);
          console.log('Side Effects data:', sideEffectsData);
        } else {
          console.error('No such profile!');
        }
      } catch (e) {
        console.error('Error fetching profile and data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndData();
  }, [profileId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile details...</p>
      </div>
    );
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div className="profile-detail">
      <h2 className="profile-detail__title">Profile Details</h2>
      <div className="profile-detail__info">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Contact:</strong> {profile.contact}</p>
      </div>
      <h3 className="profile-detail__section-title">Prescriptions</h3>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found for this patient.</p>
      ) : (
        <table className="prescriptions-table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(prescription => (
              <tr key={prescription.id}>
                <td>{prescription.medication}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.schedule}</td>
                <td>{prescription.startDate}</td>
                <td>{prescription.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="profile-detail__section-title">Adherence Records</h3>
      {adherence.length === 0 ? (
        <p className='norecord'>No adherence records found for this patient.</p>
      ) : (
        <ul className="adherence-list">
          {adherence.map(record => (
            <li key={record.id} className="adherence-list__item">
              <p><strong>Adhered:</strong> {record.adhered ? 'Yes' : 'No'}</p>
              <p><strong>Date:</strong> {record.date ? new Date(record.date.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Notes:</strong> {record.notes || 'None'}</p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="profile-detail__section-title">Side Effects</h3>
      {sideEffects.length === 0 ? (
        <p className='norecord'>No side effects records found for this patient.</p>
      ) : (
        <ul className="side-effects-list">
          {sideEffects.map(effect => (
            <li key={effect.id} className="side-effects-list__item">
              <p><strong>Side Effects:</strong> {effect.sideEffect || 'None'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileDetail;
