const router = require("express").Router();

const routes__auth = require("./auth");
const routes__exp = require("./exp");
const routes__doc = require("./doc");

router.use("/auth", routes__auth);
router.use("/exp", routes__exp);
router.use("/doc", routes__doc);

module.exports = router;
