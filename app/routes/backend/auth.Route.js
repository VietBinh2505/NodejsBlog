import express from "express";
var router = express.Router();
// admin/auth/...
const {AuthCTL} = require(__path_ctl_BE + "index.Controller")
router.get("/login", AuthCTL.checkLogout, AuthCTL.login);
router.post("/login", AuthCTL.loginPost);
router.get("/logout", AuthCTL.logout);
module.exports = router;
