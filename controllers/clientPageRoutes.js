const router = require("express").Router();
// const withAuth = require('../utils/auth');
const { Project } = require("../models");
const Client = require("../models/Client");

router.get("/list", async (req, res) => {
	try {
		// Get all clients
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

router.get("/view/client", async (req, res) => {
	try {
		// Get one clients by their first name
		const clientViewData = await Client.findOne(req.params.firstName, {});

		// Serialize data so the template can read it
		const clients = clientViewData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("clientView", {
			clients,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/view/:id", async (req, res) => {
	try {
		// Get one clients by their first name
		const clientViewData = await Client.findOne(req.params.id, {});

		// Serialize data so the template can read it
		const clients = clientViewData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("clientViewById", {
			clients,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
