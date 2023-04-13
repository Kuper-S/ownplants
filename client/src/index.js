import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const apiKey = process.env.API_KEY_FIREBASE;
const authDomain = process.env.AUTH_DOMAIN_FIREBASE;
const projectId = process.env.PROJECT_ID_FIREBASE;
const storageBucket = process.env.STORAGE_BUCKET_FIREBASE;
const messagingSenderId = process.env.MESSAGING_SENDER_ID_FIREBASE;
const appId = process.env.APP_ID_FIREBASE;
const measurementId = process.env.MEASUREMENT_ID_FIREBASE;

const firebaseConfig = {
  
  apiKey: apiKey,
  authDomain: authDomain,
  projectId:  projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

