import express from "express";
var router = express.Router();
// blog/...
router.use("/", require("./home.Route"));
router.use("/about", require("./about.Route "));
router.use("/contact", require("./contact.Route "));
router.use("/category", require("./categ.Route"));
router.use("/article", require("./article.Route"));
module.exports = router;
