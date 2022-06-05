const { Client } = require("../../models");
const router = require("express").Router();

router.get("/");

router.post("/", async (req, res) => {
    try {
        const addClient = await Client.create({
            clientName: req.body.clientName,
            location: req.body.location,
            budget: req.body.budget,
            clientId: req.body.clientId,
            notes: req.body.notes,
        });

        // Serialize data so the template can read it
        const Client = addClient.get({ plain: true });

        // Pass serialized data and session flag into template
        res.render("client", {
            client,
            logged_in: req.session.logged_in,
        });

        console.log("addClient", addClient);
        res.status(200).json(addClient);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});
module.exports = router;
