const admin = require('firebase-admin');
const db = admin.firestore();
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

// GET all users
const getUsers = async (req, res, next) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push(doc.data());
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting users' });
  }
};

// GET a user by ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userDoc = await db.collection('users').doc(id).get();
    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(userDoc.data());
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting user' });
  }
};

// CREATE a new user
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Generate a salt to use for hashing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword // Store the hashed password in the database
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// UPDATE a user by ID
const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, location } = req.body;
  const updatedUser = new User({
    name,
    email,
    phone,
    location,
  });
  try {
    await db.collection('users').doc(id).set(updatedUser, { merge: true });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

// DELETE a user by ID
const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.collection('users').doc(id).delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
