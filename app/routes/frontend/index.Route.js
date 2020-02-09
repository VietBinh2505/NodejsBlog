import express from "express";
var router = express.Router();

router.use("/", require("./home.Route"));
router.use("/category", require("./categ.Route"));
router.use("/post", require("./post.Route"));
module.exports = router;
