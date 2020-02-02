import express from "express";
var router 	= express.Router();
import { GroupsCTL} from "../../controller/index.Controller";
// admin/group/...
router.get("/", GroupsCTL.listGroups);
router.get("/form(/:id)?", GroupsCTL.formGroups);
router.post("/save", GroupsCTL.saveGroups);

router.get("/delete/:id", GroupsCTL.deleteGroups);
router.post("/delete", GroupsCTL.deleteMulti);
router.get("(/:status)?", GroupsCTL.listGroups); // tìm kiếm
router.get("/change-status/:id/:status", GroupsCTL.changeStatus);
router.post("/change-status/:status", GroupsCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", GroupsCTL.sort);
router.post("/change-ordering", GroupsCTL.changeOrdering);
router.get("/change-group-acp/:id/:GroupACP", GroupsCTL.changeGroupACP);

module.exports = router;
