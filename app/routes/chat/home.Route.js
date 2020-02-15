import express from "express";
var router 	= express.Router();
const { HomeCTL} = require(__path_ctl_Chat + "index.Controller.chat");
// chat/...
router.get("/", HomeCTL.HomeChat);
module.exports = router;
