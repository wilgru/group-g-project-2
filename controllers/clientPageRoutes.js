const router = require("express").Router();
// const withAuth = require('../utils/auth');
const {} = require("../models");
const Client = require("../models/Client");

router.get("/list", async (req, res) => {
	try {
		// Get all clients and JOIN with projects data
		const clientData = await Client.findAll({});

		// Serialize data so the template can read it
		const clients = clientData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("clientList", {
			clients,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/add", (req, res) => {
	res.render("clientAdd");
});

router.get("/view/projects", (req, res) => {
	res.render("home");
});

router.get("/view", (req, res) => {
	res.render("clientView");
});

module.exports = router;
