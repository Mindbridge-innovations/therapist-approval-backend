// controllers/loginController.js
const { authenticateUser } = require('../utils/login');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, userData } = await authenticateUser(email, password);
    res.json({ token, userData });
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    const status = error.message === 'User not found' ? 404 : 401;
    res.status(status).json({ message: error.message });
  }
};

module.exports = { login };