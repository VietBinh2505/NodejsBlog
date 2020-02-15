var express = require("express");
var router = express.Router();

const { AuthMDW, item } = require(__path_mdware + "index.middleware");
// chat/
router.use("/", require("./home.Route"));
router.use("/auth",
   AuthMDW.getUserInfo, //lấy được user người đăng nhập
   item.getCategMenu, //có ItemCateg
   item.ArticleRandom, //lấy được ArticleRandom
   require("./auth.Route"));
module.exports = router;
