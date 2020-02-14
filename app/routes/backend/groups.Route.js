import express from "express";
var router 	= express.Router();
const { GroupsCTL, AuthCTL} = require(__path_ctl_BE + "index.Controller");
// admin/group/...
router.get("/", AuthCTL.checkLogin, GroupsCTL.listGroups);
router.get("/form(/:id)?", AuthCTL.checkLogin, GroupsCTL.formGroups);
router.post("/save", GroupsCTL.saveGroups);

router.get("/delete/:id", AuthCTL.checkLogin, GroupsCTL.deleteGroups);
router.post("/delete", AuthCTL.checkLogin, GroupsCTL.deleteMulti);
router.get("(/:status)?", AuthCTL.checkLogin, GroupsCTL.listGroups); // tìm kiếm
router.get("/change-status/:id/:status", AuthCTL.checkLogin, GroupsCTL.changeStatus);
router.post("/change-status/:status", AuthCTL.checkLogin, GroupsCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", AuthCTL.checkLogin, GroupsCTL.sort);
router.post("/change-ordering", AuthCTL.checkLogin, GroupsCTL.changeOrdering);
router.get("/change-group-acp/:id/:GroupACP", AuthCTL.checkLogin, GroupsCTL.changeGroupACP);

module.exports = router;
