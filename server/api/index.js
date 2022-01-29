const router = require("express").Router();

const routes__auth = require("./auth");

router.use("/auth", routes__auth);

module.exports = router;
