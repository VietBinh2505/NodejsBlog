import express from "express";
var router = express.Router();

const { dashBoardCTL, AuthCTL} = require(__path_ctl_BE + "index.Controller");
// admin/...
router.get("/dashboard", AuthCTL.checkLogin, dashBoardCTL.listDashBoard);
router.get("/noPermission", AuthCTL.noPermission);
module.exports = router;
