import express from "express";
var router = express.Router();
// /auth/...
const { invitation} = require(__path_ctl_ChatApi + "index.chatApi");

router.get("/receive",  invitation.invitationReceive);
router.get("/send",  invitation.invitationSend);
router.get("/room",  invitation.listRoom);
router.get("/friend",  invitation.friends);
module.exports = router;
