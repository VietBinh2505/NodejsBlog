import express from "express";
var router 	= express.Router();
import { UsersCTL } from "../../controller/index.Controller";
// admin/users/...
router.get("/", UsersCTL.listUser);
router.get("/form(/:id)?", UsersCTL.formUser);
router.post("/save", UsersCTL.saveUser);

router.get("/delete/:id", UsersCTL.deleteUser);
router.post("/delete", UsersCTL.deleteMulti);
router.get("(/:status)?", UsersCTL.listUser); // tìm kiếm
router.get("/change-status/:id/:status", UsersCTL.changeStatus);
router.post("/change-status/:status", UsersCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", UsersCTL.sort);
router.post("/change-ordering", UsersCTL.changeOrdering);
router.get("/filter-group/:id", UsersCTL.filter_group);
module.exports = router;
