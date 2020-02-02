import express from "express";
var router 	= express.Router();
import { itemsCTL} from "../../controller/index.Controller";
// admin/item/...
router.get("/", itemsCTL.listItem);
router.get("/form(/:id)?", itemsCTL.formItem);
router.post("/save", itemsCTL.saveItem);

router.get("/delete/:id", itemsCTL.deleteItem);
router.post("/delete", itemsCTL.deleteItemMulti);
router.get("(/:status)?", itemsCTL.listItem); // tìm kiếm
router.get("/change-status/:id/:status", itemsCTL.changeStatus);
router.post("/change-status/:status", itemsCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", itemsCTL.sort);
router.post("/change-ordering", itemsCTL.changeOrdering);
module.exports = router;
