import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'; // Import toast function from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import '../styles/style.css'; 

function SideEffectForm() {
  const [userId, setUserId] = useState('');
  const [sideEffect, setSideEffect] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate data
    if (!userId || !sideEffect || !date) {
      toast.error('All fields must be filled'); // Error toast
      return;
    }

    try {
      await addDoc(collection(firestore, 'sideEffects'), {
        userId,
        sideEffect,
        date,
      });
      toast.success('Document successfully written!'); // Success toast
      // Optionally, you can clear the form here
      setUserId('');
      setSideEffect('');
      setDate('');
    } catch (e) {
      toast.error('Error adding document: ' + e.message); // Error toast with error message
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="side-effect-form">
      <header>
        <h2>Side Effect Form</h2>
        <p>Please fill out the details below to report a side effect.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Side Effect:
          <input type="text" value={sideEffect} onChange={(e) => setSideEffect(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SideEffectForm;
