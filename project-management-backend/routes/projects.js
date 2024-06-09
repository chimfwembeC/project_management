// routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken = require('../middleware/auth');
// Route to get all projects
router.get('/', authenticateToken,async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a project by ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Route to create a new project
router.post('/',authenticateToken, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a project
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const updatedProject = await Project.update(req.params.id, req.body);
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a project
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    await Project.delete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
