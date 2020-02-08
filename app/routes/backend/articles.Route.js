import express from "express";
var router 	= express.Router();
import { articleCTL } from "../../controller/index.Controller";
// admin/article/...
router.get("/", articleCTL.listArticle);
router.get("/form(/:id)?", articleCTL.formArticle);
router.post("/save", articleCTL.saveArticle);
router.get("/delete/:id", articleCTL.deleteArticle);
router.post("/delete", articleCTL.deleteArticleMulti);
router.get("(/:status)?", articleCTL.listArticle); // tìm kiếm
router.get("/change-status/:id/:status", articleCTL.changeStatus);
router.post("/change-status/:status", articleCTL.changeStatusMulti);
router.get("/sort/:sortField/:sortType", articleCTL.sort);
router.post("/change-ordering", articleCTL.changeOrdering);
router.get("/filter_category/:id", articleCTL.filter_categ);
module.exports = router;
