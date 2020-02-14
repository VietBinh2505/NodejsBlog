import express from "express";
var router 	= express.Router();
const { articleCTL, AuthCTL} = require(__path_ctl_BE + "index.Controller");

// admin/article/...
router.get("/", AuthCTL.checkLogin,  articleCTL.listArticle);
router.get("/form(/:id)?", AuthCTL.checkLogin,  articleCTL.formArticle);
router.post("/save",  articleCTL.saveArticle);
router.get("/delete/:id", AuthCTL.checkLogin,  articleCTL.deleteArticle);
router.post("/delete", AuthCTL.checkLogin,  articleCTL.deleteArticleMulti);
router.get("(/:status)?", AuthCTL.checkLogin,  articleCTL.listArticle); // tìm kiếm
router.get("/change-status/:id/:status", AuthCTL.checkLogin,  articleCTL.changeStatus);
router.post("/change-status/:status", AuthCTL.checkLogin,  articleCTL.changeStatusMulti);

router.get("/change-special/:id/:special", AuthCTL.checkLogin,  articleCTL.changeSpecial);
router.post("/change-special/:special", AuthCTL.checkLogin,  articleCTL.changeSpecialMulti);

router.get("/sort/:sortField/:sortType", AuthCTL.checkLogin,  articleCTL.sort);
router.post("/change-ordering", AuthCTL.checkLogin,  articleCTL.changeOrdering);
router.get("/filter_category/:id", AuthCTL.checkLogin,  articleCTL.filter_categ);
module.exports = router;
