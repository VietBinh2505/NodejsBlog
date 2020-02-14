import express from "express";
var router = express.Router();

const { dashBoardCTL} = require(__path_ctl_BE + "index.Controller");
// admin/...
router.get("/dashboard", dashBoardCTL.listDashBoard);
module.exports = router;
