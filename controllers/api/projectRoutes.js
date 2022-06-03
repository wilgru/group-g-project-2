const { Project } = require("../../models");
const withAuth = require("./../../utils/auth");
const router = require("express").Router();

router.get("/");

router.post("/", withAuth, async (req, res) => {
	try {
		const newProject = await Project.create({
			projectName: req.body.projectName,
			address: req.body.address,
			budget: req.body.budget,
			clientId: req.body.clientId,
			managerId: req.body.managerId,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip,
			notes: req.body.notes,
			dateCreated: req.body.dateCreated,
		});

		// Serialize data so the template can read it
		const projects = newProject.get({ plain: true });

		// Pass serialized data and session flag into template
		res.render("projects", {
			projects,
			logged_in: req.session.logged_in,
		});

		console.log("newProject", newProject);
		res.status(200).json(newProject);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

module.exports = router;
