var express = require("express");
var router = express.Router();

const { AuthMDW} = require(__path_mdware + "index.middleware");
router.use("/auth", require("./auth.Route")); //item.getCategMenu, //có ItemCateg item.ArticleRandom, //lấy được ArticleRandom
router.use("/",
   AuthMDW.checkLoginchat,
   AuthMDW.getUserInfo, // có user data
   require("./home.Route")
);

module.exports = router;
