const admin = require('firebase-admin');
const db = admin.firestore();

const plantSchema = {
  name: { type: String },
  species: { type: String },
  age: { type: Number },
  origin: { type: String },
  description: { type: String },
  user_id: { type: String }
};

const Plant = db.collection('plants');

module.exports = { plantSchema, Plant };