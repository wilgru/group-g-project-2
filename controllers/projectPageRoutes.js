const router = require("express").Router();
// const withAuth = require('../utils/auth');
const { Project } = require("../models");

// project routes
router.get("/list", async (req, res) => {
	try {
		// Get all clients and JOIN with projects data
		const projectData = await Project.findAll({});

		// Serialize data so the template can read it
		const projects = projectData.map((project) => project.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("projectList", {
			projects,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/add", (req, res) => {
	res.render("projectAdd");
});

router.get("/view", (req, res) => {
	res.render("projectView");
});

module.exports = router;
