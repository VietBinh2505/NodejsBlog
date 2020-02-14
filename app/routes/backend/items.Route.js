import express from "express";
var router 	= express.Router();
const { itemsCTL, AuthCTL} = require(__path_ctl_BE + "index.Controller");
// admin/item/...
router.get("/", AuthCTL.checkLogin, itemsCTL.listItem);
router.get("/form(/:id)?", AuthCTL.checkLogin, itemsCTL.formItem);
router.post("/save", itemsCTL.saveItem);

router.get("/delete/:id", AuthCTL.checkLogin, itemsCTL.deleteItem);
router.post("/delete", AuthCTL.checkLogin, itemsCTL.deleteItemMulti);
router.get("(/:status)?", AuthCTL.checkLogin, itemsCTL.listItem); // tìm kiếm
router.get("/change-status/:id/:status", AuthCTL.checkLogin, itemsCTL.changeStatus);
router.post("/change-status/:status", AuthCTL.checkLogin, itemsCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", AuthCTL.checkLogin, itemsCTL.sort);
router.post("/change-ordering", AuthCTL.checkLogin, itemsCTL.changeOrdering);
module.exports = router;
