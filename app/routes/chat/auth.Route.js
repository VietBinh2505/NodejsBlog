import express from "express";
var router = express.Router();
// blog/auth/...

const { AuthMDW} = require(__path_mdware + "index.middleware");
router.get("/login", AuthMDW.checkLogout, AuthMDW.login);
router.post("/login", AuthMDW.loginPost);
router.get("/logout", AuthMDW.logout);
router.get("/noPermission", AuthMDW.noPermission);
module.exports = router;
