import express from "express";
var router = express.Router();
// /auth/...
const { chatApi} = require(__path_ctl_ChatApi + "index.chatApi");

router.post("/addFriend", chatApi.addFriend);
module.exports = router;
