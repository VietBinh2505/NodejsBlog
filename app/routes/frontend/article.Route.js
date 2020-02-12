import express from "express";
var router = express.Router();

const {ArticleCTL_FE} = require(__path_ctl_FE + "index.ControllerFE")

router.get("/(:id)?", ArticleCTL_FE.listArticle);

module.exports = router;
