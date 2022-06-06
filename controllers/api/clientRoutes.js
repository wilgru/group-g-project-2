const { Client } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const addClient = await Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      dateCreated: req.body.dateCreated,
    });

    // Pass serialized data and session flag into template
    res.render('clientList', {
      logged_in: req.session.logged_in,
    });

    res.status(200).json(addClient);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const clientData = await Client.destroy({
      where: {
        id: req.params.id,
        managerId: req.session.manager_id,
      },
    });

    if (!clientData) {
      res.status(404).json({ message: 'No client found with this id!' });
      return;
    }

    res.status(200).json(clientData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
