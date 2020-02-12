import express from "express";
var router = express.Router();

const {ContactCTL_FE} = require(__path_ctl_FE + "index.ControllerFE")

router.get("/", ContactCTL_FE.listContact);

module.exports = router;
