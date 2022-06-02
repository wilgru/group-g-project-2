const router = require("express").Router();
const withAuth = require("./../utils/auth");
const { Project, Client } = require("../models");

router.get("/list", withAuth, async (req, res) => {
	try {
		// Get all clients
		const clientData = await Client.findAll({});

		// Serialize data so the template can read it
		const clients = clientData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("clientList", {
			clients,
			logged_in: req.session.logged_in,
			manager_name: req.session.manager_name,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/add", withAuth, (req, res) => {
	res.render("clientAdd", {
		logged_in: req.session.logged_in,
		manager_name: req.session.manager_name,
	});
});

// router.get("/view/projects", (req, res) => {
// 	res.render("home");
// });

router.get("/list/#firstName", withAuth, async (req, res) => {
	try {
		const emptySearch = false;

		// Get one clients by their first name
		const clientViewData = await Client.findAll({
			where: {
				firstName: req.query.firstName,
			},
		});

		// Serialize data so the template can read it
		const clients = clientViewData.map((posts) => posts.get({ plain: true }));

		if (!clients) {
			emptySearch = true;
		}

		// Pass serialized data and session flag into template
		res.render("clientView", {
			emptySearch,
			clients,
			logged_in: req.session.logged_in,
			manager_name: req.session.manager_name,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/view/:id", withAuth, async (req, res) => {
	try {
		// Get one clients by their first name
		const clientViewData = await Client.findByPk(req.params.id, {
			include: {
				model: Project,
			},
		});

		if (!clientViewData) {
			res.redirect("/");
			return;
		}

		// Serialize data so the template can read it
		const client = clientViewData.get({ plain: true });

		// Pass serialized data and session flag into template
		res.render("clientView", {
			client,
			logged_in: req.session.logged_in,
			manager_name: req.session.manager_name,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
