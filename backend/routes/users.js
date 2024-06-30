// routes/tasks.js

const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;
const Project = db.Project;
const Task = db.Task;


const {authenticateToken} = require('../middleware/auth');
// Route to get all Users
router.get('/',authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { 
          model: Project,
          as: 'projects',
          attributes: ['id','title','description','completed'],
         },
         { 
          model: Task,
          as: "tasks",
          attributes: ['id','title','description','completed'],
         }
       ]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a user by ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [
       { 
         model: Project,
         as: 'projects',
         attributes: ['id','title','description','completed'],
        },
        { 
         model: Task,
         as: "tasks",
         attributes: ['id','title','description','completed'],
        }
      ]
   });
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Route to create a new task
router.post('/',authenticateToken, async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a User
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a task
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
