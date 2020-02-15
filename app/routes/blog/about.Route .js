import express from "express";
var router = express.Router();

const {AboutCTL_FE} = require(__path_ctl_FE + "index.ControllerFE")

router.get("/", AboutCTL_FE.listItem);

module.exports = router;
