import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { messaging } from './firebase'; // Import messaging from firebase
import HomePage from './components/HomePage';
import PrescriptionParser from './components/PrescriptionParser';
import PatientProfile from './components/PatientProfile';
import FeedbackForm from './components/FeedbackForm';
import PrescriptionsList from './components/PrescriptionsList';
import PatientHistory from './components/PatientHistory';
import Navbar from '../src/header/Navbar';
import AddProfile from './components/AddProfile';
import ProfileDetail from './components/ProfileDetail';
import AdherenceForm from './components/AdherenceForm';
import SideEffectForm from './components/SideEffectForm';
import AdherenceHistory from './components/AdherenceHistory';
import SideEffectsHistory from './components/SideEffectsHistory';
import AddAppointment from './components/AddAppointment';
import { getToken } from 'firebase/messaging';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      messaging.useServiceWorker(registration);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

const App = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');

          const token = await getToken(messaging, {
            vapidKey:  import.meta.env.VITE_VAPID_KEY
          });
          console.log('FCM Token:', token);
         
        } else {
          console.error('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error getting notification permission or token:', error);
      }
    };

    requestPermission();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<PatientProfile />} />
          <Route path="/profile/:profileId" element={<ProfileDetail />} />
          <Route path="/prescriptions" element={<PrescriptionParser />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/history" element={<PatientHistory />} />
          <Route path="/prescriptions-list" element={<PrescriptionsList />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/adherence-form" element={<AdherenceForm />} />
          <Route path="/side-effect-form" element={<SideEffectForm />} />
          <Route path="/adherence-history" element={<AdherenceHistory />} />
          <Route path="/side-effects-history" element={<SideEffectsHistory />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
