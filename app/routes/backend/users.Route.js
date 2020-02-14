import express from "express";
var router 	= express.Router();
const { UsersCTL, AuthCTL} = require(__path_ctl_BE + "index.Controller");
// admin/users/...
router.get("/", AuthCTL.checkLogin, UsersCTL.listUser);
router.get("/form(/:id)?", AuthCTL.checkLogin, UsersCTL.formUser);
router.post("/save", UsersCTL.saveUser);

router.get("/delete/:id", AuthCTL.checkLogin, UsersCTL.deleteUser);
router.post("/delete", AuthCTL.checkLogin, UsersCTL.deleteUserMulti);
router.get("(/:status)?", AuthCTL.checkLogin, UsersCTL.listUser); // tìm kiếm
router.get("/change-status/:id/:status", AuthCTL.checkLogin, UsersCTL.changeStatus);
router.post("/change-status/:status", AuthCTL.checkLogin, UsersCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", AuthCTL.checkLogin, UsersCTL.sort);
router.post("/change-ordering", AuthCTL.checkLogin, UsersCTL.changeOrdering);
router.get("/filter-group/:id", AuthCTL.checkLogin, UsersCTL.filter_group);
module.exports = router;
