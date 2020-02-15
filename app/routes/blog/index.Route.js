import express from "express";
var router = express.Router();

const { AuthMDW, item } = require(__path_mdware + "index.middleware");
// blog/...
router.use("/", 
   item.getCategMenu, //có ItemCateg
   item.ArticleRandom, //lấy được ArticleRandom
   require("./home.Route"));

router.use("/about", require("./about.Route "));
router.use("/contact", require("./contact.Route "));
router.use("/category", require("./categ.Route"));
router.use("/article", require("./article.Route"));

module.exports = router;
