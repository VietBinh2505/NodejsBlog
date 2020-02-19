import express from "express";
var router = express.Router();
// /auth/...
const { roomCTL} = require(__path_ctl_Chat + "index.Controller.chat");

router.get("/:id", roomCTL.roomChat);
module.exports = router;
