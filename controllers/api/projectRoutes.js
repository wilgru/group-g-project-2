const { Project } = require("../../models");

const router = require("express").Router();

router.get("/");

router.post("/", async (req, res) => {
	try {
		const newProject = await Project.create({
			projectName: req.body.projectName,
			location: req.body.location,
			budget: req.body.budget,
			clientId: req.body.clientId,
			managerId: req.body.managerId,
			notes: req.body.notes,
		});
		console.log("newProject", newProject);
		res.status(200).json(newProject);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

module.exports = router;
