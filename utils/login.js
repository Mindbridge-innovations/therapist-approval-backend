// utils/login.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/firebaseConfig');

const secretKey = process.env.JWT_SECRET;

const authenticateUser = async (email, password) => {
  const usersRef = db.ref('users');
  const usersQuery = usersRef.orderByChild('email').equalTo(email);
  const snapshot = await usersQuery.once('value');

  if (!snapshot.exists()) {
    throw new Error('User not found');
  }

  const usersData = snapshot.val();
  const userKey = Object.keys(usersData).find(key => usersData[key].email === email);
  const userData = usersData[userKey];

  if (!userData.isVerified) {
    throw new Error('User is not verified yet! Please check your inbox for verification mail.');
  }

  const passwordMatch = await bcrypt.compare(password, userData.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  if (userData.role !== 'admin' && userData.role !== 'therapist') {
    throw new Error('Access denied. Only admins and therapists can log in.');
  }

  const token = jwt.sign({ userId: userData.userId, role: userData.role }, secretKey, { expiresIn: '7d' });

  const { password: userPassword, ...userWithoutPassword } = userData;
  return { token, userData: userWithoutPassword };
};

module.exports = { authenticateUser };