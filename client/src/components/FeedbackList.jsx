import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'feedback'));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(docs);
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Feedback</h2>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.id}>
            <p>Medication Taken: {feedback.medicationTaken ? 'Yes' : 'No'}</p>
            <p>Side Effect: {feedback.sideEffect}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
