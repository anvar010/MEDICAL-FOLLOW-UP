import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'; // Import toast function from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import '../styles/style.css'; 

const FeedbackForm = () => {
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [sideEffect, setSideEffect] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const clearForm = () => {
    setMedicationTaken(false);
    setSideEffect('');
    setEmail('');
    setMessage('');
    setName('');
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'feedback'), {
        medicationTaken,
        sideEffect,
        email,
        message,
        name,
      });
      toast.success('Feedback submitted successfully!'); // Success message
      clearForm(); // Clear form after successful submission
    } catch (e) {
      toast.error('Error submitting feedback. Please try again.'); // Error message
      console.error('Error submitting feedback:', e);
    }
  };

  return (
    <div className="wrapper1">
      <h2>Feedback Form</h2>
      <form onSubmit={submitFeedback}>
        <div className="input_field">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="input_field">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="input_field">
          <label>
            Medication Taken:
            <input
              type="checkbox"
              checked={medicationTaken}
              onChange={(e) => setMedicationTaken(e.target.checked)}
            />
          </label>
        </div>
        <div className="input_field">
          <label>
            Side Effect:
            <input
              type="text"
              value={sideEffect}
              onChange={(e) => setSideEffect(e.target.value)}
            />
          </label>
        </div>
        <div className="input_field">
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>
        <div className="btn">
          <input type="submit" value="Submit Feedback" />
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
