import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/style.css';

const AdherenceForm = () => {
  const [userId, setUserId] = useState(''); 
  const [adhered, setAdhered] = useState(false);
  const [notes, setNotes] = useState('');
  const firestore = getFirestore();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate userId
    if (!userId) {
      toast.error('Please enter a valid User ID');
      return;
    }

    try {
      await addDoc(collection(firestore, 'adherence'), {
        userId,     
        date: new Date(),
        adhered,
        notes,
      });
      toast.success('Adherence recorded successfully');
      // Clear form fields on success
      setUserId('');
      setAdhered(false);
      setNotes('');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to record adherence. Please try again.');
    }
  };

  return (
    <div className="form-section">
      <header className="form-header-container">
        <h2 className="form-header-title">Adherence Form</h2>
        <div className="form-header-text">Please fill out the form below</div>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label" htmlFor="userId">
            User ID:
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)} 
              required
            />
          </div>
        </div>
        <div>
          <label className="form-label" htmlFor="adhered">
            Adhered:
          </label>
          <div className="form-input-wrapper">
            <input
              type="checkbox"
              id="adhered"
              checked={adhered}
              onChange={() => setAdhered(!adhered)}
            />
          </div>
        </div>
        <div>
          <label className="form-label" htmlFor="notes">
            Notes:
          </label>
          <div className="form-input-wrapper">
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <button type="submit">Submit</button>
        <button 
          type="button" 
          className="form-button1" 
          onClick={() => navigate('/side-effect-form')}
        >
          Add Side Effect
        </button>
      </form>
      
     
      <ToastContainer />
    </div>
  );
};

export default AdherenceForm;
