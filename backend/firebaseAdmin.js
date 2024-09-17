// server/firebaseAdmin.js
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // Replace with path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
