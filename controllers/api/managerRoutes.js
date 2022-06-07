const { Manager } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

// Create Route for Manager Login Function
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const managerData = await Manager.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!managerData) {
      res.status(400).json({ pass: false, message: 'incorrect email or password. Please check your spelling and try again.' });
      return;
    }
    // Check Correct Password
    const passwordStatus = managerData.checkPassword(req.body.password);

    if (!passwordStatus) {
      res.status(400).json({ pass: false, message: 'incorrect email or password. Please check your spelling and try again.' });
      return;
    }

    const manager = await managerData.get({ plain: true });

    req.session.save(() => {
      req.session.manager_id = manager.id;
      req.session.manager_name = manager.name;
      req.session.logged_in = true;

      res.json({ pass: true, message: 'logged in!' });
    });
  } catch (error) {
    console.error(error);
  }
});

// Create Route for new Manager Signup Function
router.post('/signup', async (req, res) => {
  try {
    const newManagerData = await Manager.create(req.body);
    const newManager = await newManagerData.get({ plain: true });
    // Make an express session
    req.session.save(() => {
      req.session.manager_id = newManager.id;
      req.session.manager_name = newManager.name;
      req.session.logged_in = true;

      res.json({ pass: true, message: 'You are now logged in!' });
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.errors[0].path === 'email') {
      res.status(400).send({ pass: false, message: 'A user with this email already exists.' });
    } else {
      console.error(error);
      res.status(500).send(error);
    }
  }
});

// Create Route for Logout Function
router.post('/logout', withAuth, async (req, res) => {
  // Delete the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
