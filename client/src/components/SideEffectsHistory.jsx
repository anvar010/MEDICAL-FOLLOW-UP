import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const SideEffectsHistory = ({ userId }) => {
  const [sideEffectsData, setSideEffectsData] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchSideEffectsData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'sideEffects'));
      const data = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.userId === userId);
      setSideEffectsData(data);
    };

    fetchSideEffectsData();
  }, [userId]);

  return (
    <div>
      <h2>Side Effects History</h2>
      <ul>
        {sideEffectsData.map((item) => (
          <li key={item.id}>
            Date: {item.date.toDate().toLocaleDateString()}, Side Effect: {item.sideEffect}, Severity: {item.severity}, Notes: {item.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideEffectsHistory;
