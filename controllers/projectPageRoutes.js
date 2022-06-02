const router = require("express").Router();
const withAuth = require('./../middlewares/withAuth');
const { Project, Client, Manager } = require("../models");
const { Op, Sequelize } = require("sequelize");

// project routes
router.get("/list", async (req, res) => {
	try {
		let projectData;
		let isSearch = false;
		let searchMessage = "";
		let searchTerm = "";

		// if ther are query params
		if (req.query.q) {
			isSearch = true;
			searchTerm = req.query.q;

			console.log(searchTerm)
			// Get one projects by their first name
			projectData = await Project.findAll({
				where: {
					projectName: {
						[Op.substring]: searchTerm
					}
				}
			});

			searchMessage = `Found ${projectData.length} results for '${searchTerm}'`

		} else {
			// Get all projects
			projectData = await Project.findAll();
		}

		if (!projectData) {
			res.redirect('/');
			return;
		}

		// Serialize data so the template can read it
		const projects = projectData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("projectList", {
			isSearch,
			searchMessage,
			searchTerm,
			projects,
			logged_in: req.session.logged_in,
			manager_name: req.session.manager_name
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/add", (req, res) => {

	res.render("projectAdd", {
		logged_in: req.session.logged_in,
		manager_name: req.session.manager_name,
	});
});
// *****************************************************************
// router.get("/view/:projectId", (req, res) => {
// 	res.render("projectView", {
// 		logged_in: req.session.logged_in,
// 		manager_name: req.session.manager_name,
// 	});
// });

// *****************************************************************

router.get("/:id", async (req, res) => {
	try {
		// Get one projects by their first name
		const projectViewData = await Project.findByPk(req.params.id, {
			include: [{ model: Client }, { model: Manager }],
		});

		if (!projectViewData) {
			res.redirect('/');
			return;
		}

		// Serialize data so the template can read it
		const project = projectViewData.get({ plain: true });

		// Pass serialized data and session flag into template
		res.render("projectView", {
			project,
			logged_in: req.session.logged_in,
			manager_name: req.session.manager_name,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;