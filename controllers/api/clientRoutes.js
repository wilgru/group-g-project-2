const { Client } = require("../../models");
const router = require("express").Router();

router.get("/");

router.post("/", async (req, res) => {
    try {
        const addClient = await Client.create({
            firstName: req.body.clientName,
            lastName: req.body.clientName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            email: req.body.email
        });

        // Serialize data so the template can read it
        const client = addClient.get({ plain: true });

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
