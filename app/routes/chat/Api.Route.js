import express from "express";
var router = express.Router();
// /auth/...
const { chatApi} = require(__path_ctl_ChatApi + "index.chatApi");

router.post("/addFriend", chatApi.addFriend);
router.post("/add-friend-deny", chatApi.addFriendDeny);
router.post("/add-friend-accept", chatApi.addFriendAccept);
module.exports = router;
