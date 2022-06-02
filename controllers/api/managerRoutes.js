const { Manager } = require("../../models");
const withAuth = require("./../../utils/auth");
const router = require("express").Router();

router.post("/login", async (req, res) => {
	console.log(req.body);
	try {
		const managerData = await Manager.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!managerData) {
			res.status(400).json({ pass: false, message: "incorrect email or password. Please check your spelling and try again." });
			return;
		}

		const passwordStatus = managerData.checkPassword(req.body.password);

		if (!passwordStatus) {
			res.status(400).json({ pass: false, message: "incorrect email or password. Please check your spelling and try again." });
			return;
		}

		const manager = await managerData.get({ plain: true });

		req.session.save(() => {
			req.session.manager_id = manager.id;
			req.session.manager_name = manager.name;
			req.session.manager_email = manager.password;
			req.session.logged_in = true;

			res.json({ pass: true, message: "logged in!" });
		});
	} catch (error) {
		console.error(error);
		// res.status(500).send(error);
	}
});

router.post("/signup", withAuth, async (req, res) => {
	try {
		const newManagerData = await Manager.create(req.body);
		const newManager = newManagerData.get({ plain: true });

		req.session.save(() => {
			req.session.Manager_id = newManager.id;
			req.session.Manager_name = newManager.name;
			req.session.Manager_email = newManager.password;
			req.session.logged_in = true;

			res.json({ pass: true, message: "You are now logged in!" });
		});
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === "email") {
			res.status(400).send({ pass: false, message: "A user with this email already exists." });
		} else {
			console.error(error);
			res.status(500).send(error);
		}
	}
});

router.post("/logout", withAuth, async (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
