const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

router.get('/');

// Create a route for the Create Project Functionality
router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      projectName: req.body.projectName,
      address: req.body.address,
      budget: req.body.budget,
      clientId: req.body.clientId,
      managerId: req.body.managerId,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      notes: req.body.notes,
      dateCreated: req.body.dateCreated,
    });

    // complete request
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
