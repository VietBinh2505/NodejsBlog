import express from "express";
var router = express.Router();

const folderView 	= __path_views_blog + "pages/category/";
const layoutFE 	= __path_views_blog + "frontend";
router.get("/", function (req, res, next) {
	res.render(`${folderView}indexCategBlog`, {
		pageTitle: "publishPage ",
		layout: layoutFE,
		top_post: false,
	});
});

module.exports = router;
