import express from "express";
var router = express.Router();
// blog/
const {homeCTL_FE} = require(__path_ctl_FE + "index.ControllerFE");
router.get("/", homeCTL_FE.listItem);
module.exports = router;
