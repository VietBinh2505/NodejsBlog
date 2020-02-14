import express from "express";
var router 	= express.Router();
const { UsersCTL} = require(__path_ctl_BE + "index.Controller");
// admin/users/...
router.get("/", UsersCTL.listUser);
router.get("/form(/:id)?", UsersCTL.formUser);
router.post("/save", UsersCTL.saveUser);

router.get("/delete/:id", UsersCTL.deleteUser);
router.post("/delete", UsersCTL.deleteUserMulti);
router.get("(/:status)?", UsersCTL.listUser); // tìm kiếm
router.get("/change-status/:id/:status", UsersCTL.changeStatus);
router.post("/change-status/:status", UsersCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", UsersCTL.sort);
router.post("/change-ordering", UsersCTL.changeOrdering);
router.get("/filter-group/:id", UsersCTL.filter_group);
module.exports = router;
