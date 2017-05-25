const path = require("path");
const router = require("express").Router();

const authenticate = require("../middleware/authenticate");

router.use("/api", authenticate, require("./api"));

router.use("/auth", require("./auth"));
//router.use("/contents", require("./public"));

module.exports = router;
