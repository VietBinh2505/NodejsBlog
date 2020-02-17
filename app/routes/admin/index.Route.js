import express from "express";
var router = express.Router();

const { AuthMDW} = require(__path_mdware + "index.middleware");
// admin/
router.use("/", AuthMDW.checkLoginAdmin, require("./dashboard.Route"));
router.use("/items", require("./items.Route"));
router.use("/groups", require("./groups.Route"));
router.use("/users", require("./users.Route"));
router.use("/categorys", require("./categ.Route"));
router.use("/article", require("./articles.Route"));
module.exports = router;
