var express = require("express");
var router = express.Router();

router.use("/", require("./home.Route"));
router.use("/dashboard", require("./dashboard.Route"));
router.use("/items", require("./items.Route"));
router.use("/groups", require("./groups.Route"));
router.use("/users", require("./users.Route"));
router.use("/categorys", require("./categ.Route"));
router.use("/article", require("./articles.Route"));
module.exports = router;
