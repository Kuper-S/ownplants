const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require("firebase/app");
const PORT = process.env.PORT || 3001;
const projectID = process.env.PROJECT_ID_FIREBASE ;
// Your service account JSON file
const serviceAccount = require('./ownplants-kuper-firebase-adminsdk-qkv4i-ec860ebadf.json');

// Your Firebase project ID


// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectID}.firebaseio.com`,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});
