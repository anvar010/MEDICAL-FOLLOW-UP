import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const AdherenceHistory = ({ userId }) => {
  const [adherenceData, setAdherenceData] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchAdherenceData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'adherence'));
      const data = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.userId === userId);
      setAdherenceData(data);
    };

    fetchAdherenceData();
  }, [userId]);

  return (
    <div>
      <h2>Adherence History</h2>
      <ul>
        {adherenceData.map((item) => (
          <li key={item.id}>
            Date: {item.date.toDate().toLocaleDateString()}, Adhered: {item.adhered ? 'Yes' : 'No'}, Notes: {item.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdherenceHistory;
