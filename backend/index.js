// Set up express, dotenv, and other dependencies
const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');


const {authenticateToken }= require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Generate JWT_SECRET
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};
// const JWT_SECRET = generateRandomString(32);
const JWT_SECRET = 'secret';

console.log('JWT_SECRET:', JWT_SECRET);
// console.log('taskRoutes',taskRoutes);
// Middleware setup
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);






// Models setup
const db = require('./models');
const User = db.User;
const Project = db.Project;
const Task = db.Task;


// Sync models with the database
db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
});


// app.get('/api/tasks', authenticateToken,async (req, res) => {
//   try {
//     const tasks = await Task.findAll();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// // Register route
app.get('/api/auth/user',authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({where: {id:req.userId}});
    if(user){
      res.json(user);
    }else{
      res.status(404).json({error: "User not found"});
    }
  } catch (error) {
    console.log('Error fetching active user');
    res.status(500).json({error: "An Error Occured"});    
  }
});

// app.get('/update-profile', async (req, res) => {
//   try {
//     const userId = req.userId;
//     const {name, email} = req.body;

//     const user = await User.findone({where: {email: email}});

//     if(!user){
//       return res.status(404).json({message: "User Not Found"});      
//     }

//     await user.update({name, email});
//     res.json({message: "profile updated", user:user});
//   } catch (error) {
//       console.error("profile fetching error", error);
//       return res.status(500).json({message: "Internal server error:", error});          
//   }
// });

// app.post('/api/auth/register', async (req, res) => {
//   const { username, email, password } = req.body;  

//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     // res.status(201).json({ message: req.body });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       username: username,
//       email: email,
//       password: hashedPassword,      
//     });

//     // const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
//     const token = generateToken(newUser.id);

//     res.status(201).json({ message: 'User registered successfully', token });
//   } catch (err) {
//     console.error('Error during registration:', err.message);    
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Login route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
//     const token = generateToken(user.id);

//     res.json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error('Error during login:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
