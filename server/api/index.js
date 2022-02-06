const router = require("express").Router();

const routes__auth = require("./auth");
const routes__exp = require("./exp");

router.use("/auth", routes__auth);
router.use("/exp", routes__exp);

module.exports = router;
