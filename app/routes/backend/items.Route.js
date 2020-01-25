var express = require('express');
var router 	= express.Router();
import { render} from "../../controller/index.Controller";
// admin/item/...
router.get("/", render.listItem);
router.get("/form(/:id)?", render.formItem);
router.post("/save", render.saveItem);

router.get("/delete/:id", render.deleteItem);
router.post("/delete", render.deleteMulti);
router.get("(/:status)?", render.listItem); // tìm kiếm
router.get("/change-status/:id/:status", render.changeStatus);
router.post("/change-status/:status", render.changeStatusMulti);

router.post("/change-ordering", render.changeOrdering);
module.exports = router;
