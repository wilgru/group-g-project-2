const router = require("express").Router();
// const withAuth = require('../utils/auth');
const {} = require("../models");

// project routes
router.get("/list", (req, res) => {
	res.render("projectList");
});

router.get("/add", (req, res) => {
	res.render("projectAdd");
});

router.get("/view", (req, res) => {
	res.render("projectView");
});

module.exports = router;
