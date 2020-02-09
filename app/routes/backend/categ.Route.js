import express from "express";
var router 	= express.Router();
const { CategCTL} = require(__path_ctl_BE + "index.Controller");
// admin/categorys/...
router.get("/", CategCTL.listCateg);
router.get("/form(/:id)?", CategCTL.formCateg);
router.post("/save", CategCTL.saveCateg);

router.get("/delete/:id", CategCTL.deleteCateg);
router.post("/delete", CategCTL.deleteCategMulti);
router.get("(/:status)?", CategCTL.listCateg); // tìm kiếm
router.get("/change-status/:id/:status", CategCTL.changeStatus);
router.post("/change-status/:status", CategCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", CategCTL.sort);
router.post("/change-ordering", CategCTL.changeOrdering);
module.exports = router;