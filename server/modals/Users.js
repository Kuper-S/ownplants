const admin = require('firebase-admin');
const db = admin.firestore();

const userSchema = {
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  password: { type: String }
};
const User = db.collection('users');

module.exports = {userSchema, User};
