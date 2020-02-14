var express = require("express");
var router = express.Router();

router.use("/", require("./dashboard.Route"));
router.use("/items", require("./items.Route"));
router.use("/groups", require("./groups.Route"));
router.use("/users", require("./users.Route"));
router.use("/categorys", require("./categ.Route"));
router.use("/article", require("./articles.Route"));
router.use("/auth", require("./auth.Route"));
module.exports = router;
