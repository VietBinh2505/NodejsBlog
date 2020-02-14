import express from "express";
var router 	= express.Router();
const { CategCTL, AuthCTL} = require(__path_ctl_BE + "index.Controller");
// admin/categorys/...
router.get("/", AuthCTL.checkLogin, CategCTL.listCateg);
router.get("/form(/:id)?", AuthCTL.checkLogin,  CategCTL.formCateg);
router.post("/save", CategCTL.saveCateg);

router.get("/delete/:id", AuthCTL.checkLogin,  CategCTL.deleteCateg);
router.post("/delete", AuthCTL.checkLogin,  CategCTL.deleteCategMulti);
router.get("(/:status)?", AuthCTL.checkLogin,  CategCTL.listCateg); // tìm kiếm
router.get("/change-status/:id/:status", AuthCTL.checkLogin,  CategCTL.changeStatus);
router.post("/change-status/:status", AuthCTL.checkLogin,  CategCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", AuthCTL.checkLogin,  CategCTL.sort);
router.post("/change-ordering", AuthCTL.checkLogin,  CategCTL.changeOrdering);
module.exports = router;