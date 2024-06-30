// Set up express, dotenv, and other dependencies
const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Generate JWT_SECRET
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};
const JWT_SECRET = generateRandomString(32);
console.log('JWT_SECRET:', JWT_SECRET);

// Middleware setup
app.use(cors());
app.use(express.json());

// Models setup
const db = require('./models');
const User = db.User;
const Project = db.Project;

// Sync models with the database
db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
});


// Register route
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
