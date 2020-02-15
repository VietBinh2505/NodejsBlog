import express from "express";
var router = express.Router();
/// category...
const {CategCTL_FE} = require(__path_ctl_FE + "index.ControllerFE");
router.get("/:id", CategCTL_FE.listCate);

module.exports = router;
