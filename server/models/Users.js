const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const db = admin.firestore();

const userSchema = {
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  password: {
    type: String,
    set: function (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return hash;
    }
  }
};
const User = db.collection('users');

module.exports = {userSchema, User};
