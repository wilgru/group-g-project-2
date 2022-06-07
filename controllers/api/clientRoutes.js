const { add } = require('lodash');
const { Client } = require('../../models');
const router = require('express').Router();

// Create a route for the Create Client Functionality
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

    console.log('\n\n')
    console.log(addClient)
    console.log('\n\n')

    // Pass serialized data and session flag into template
    res.redirect('clientList');

    // res.status(200).json(addClient);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Create a route for the Delete Client Functionality
router.delete('/:id', async (req, res) => {
  try {
    const clientData = await Client.destroy({
      where: {
        id: req.params.id
      },
    });
    // Error handling
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
