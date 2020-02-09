import express from "express";
var router = express.Router();

const {articleCTL_FE} = require(__path_ctl_FE + "index.ControllerFE")

router.get("/", articleCTL_FE.listItem);

module.exports = router;
