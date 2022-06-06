const router = require("express").Router();
const withAuth = require("./../utils/auth");
const { Project, Client } = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/list", withAuth, async (req, res) => {
	try {
		let clientData;
		let isSearch = false;
		let searchMessage = "";
		let searchTerm = "";

		// if ther are query params
		if (req.query.q) {
			isSearch = true;
			searchTerm = req.query.q;

			console.log(searchTerm);
			// Get one clients by their first name
			clientData = await Client.findAll({
				where: {
					firstName: {
						[Op.substring]: searchTerm,
					},
				},
			});

			searchMessage = `Found ${clientData.length} results for '${searchTerm}'`;
		} else {
			// Get all clients
			clientData = await Client.findAll();
		}

		if (!clientData) {
			res.redirect("/");
			return;
		}

		// Serialize data so the template can read it
		const clients = clientData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("clientList", {
			isSearch,
			searchMessage,
			searchTerm,
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
