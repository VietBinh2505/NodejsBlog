var express = require("express");
var router = express.Router();

router.use("/", require("./home"));
router.use("/dashboard", require("./dashboard"));
router.use("/items", require("./items.Route"));
router.use("/groups", require("./groups.Route"));
router.use("/users", require("./users.Route"));
module.exports = router;
