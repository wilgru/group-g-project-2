const router = require('express').Router();
const _ = require('lodash');
const withAuth = require('../utils/auth');
const { Project, Manager, Client } = require('../models');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({});

    // Serialize data so the template can read it
    const allProjects = projectData.map((project) => project.get({ plain: true }));

    // get only the 3 most recent projects
    const projects = _.slice(allProjects, allProjects.length - 3, allProjects.length);

    // Pass serialized data and session flag into template
    res.render('home', {
      projects,
      logged_in: req.session.logged_in,
      manager_name: req.session.manager_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { layout: 'loginSignup.handlebars' });
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup', { layout: 'loginSignup.handlebars' });
});

module.exports = router;
