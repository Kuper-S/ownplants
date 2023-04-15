const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require("firebase/app");
const errorHandler = require('./middlewares/errorHandler');


const PORT = process.env.PORT || 3001;
const projectID = process.env.PROJECT_ID_FIREBASE ;
// Your service account JSON file
const serviceAccount = require('./ownplants-kuper-firebase-adminsdk-qkv4i-ec860ebadf.json');

const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: process.env.AUTH_DOMAIN_FIREBASE,
    projectId:  process.env.PROJECT_ID_FIREBASE,
    storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.APP_ID_FIREBASE,
    measurementId: process.env.MEASUREMENT_ID_FIREBASE

  };
  initializeApp(firebaseConfig);

// Initialize Firebase
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectID}.firebaseio.com`
});

// Initialize Firestore
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/test', (req, res) => {
    
    db.collection('test').get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        res.send(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error getting data from Firebase');
      });
  });
  

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});
