const admin = require('firebase-admin');
const db = admin.firestore();
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
const createUser = async (req, res, next) => {
  const { name, email, phone, location } = req.body;
  const newUser = new User({
    name,
    email,
    phone,
    location,
  });
  try {
    const docRef = await db.collection('users').add(newUser);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
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
