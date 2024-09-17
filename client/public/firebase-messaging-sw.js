importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCCGTH03l1iwMIiPH9RJya6hrAAzge2Y9E",
  authDomain: "medical-follow-up-a191a.firebaseapp.com",
  projectId: "medical-follow-up-a191a",
  storageBucket: "medical-follow-up-a191a.appspot.com",
  messagingSenderId: "820283697407",
  appId: "1:820283697407:web:8c130be605ab15df2b44ca",
  measurementId: "G-MSP07PLHDQ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(payload.notification.title, notificationOptions);
});