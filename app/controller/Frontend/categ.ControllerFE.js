const {categServiceFE, articleServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const { getParams } = require(__path_helpers + "index.helper");
const pageTitleIndex = "Categoty Page"; 
const folderView 	= __path_views_blog + "pages/category/";
const layoutFE 	= __path_views_blog + "frontend";
const listCate =  async(req, res) => {	
	let idCateg = await getParams.getParam(req.params, "id", "");
	try {
		let ItemCateg = await categServiceFE.listCategFE(null, "categ-in-menu"); // lấy được cate trên menu
		let articleItem = await articleServiceFE.listArticleSpecial(idCateg, "categnavbar"); //lấy các bài viết khi click ở navbar
		let ArticleRandom = await articleServiceFE.listArticleSpecial(null, "ArticleRandom"); // lấy ra các bài viết ngẫu nhiên
		return res.render(`${folderView}indexCategBlog`, {
			pageTitle: pageTitleIndex,
			layout: layoutFE,
			top_post: false,
			ItemCateg,
			articleItem,
			ArticleRandom,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listCateFE");
	}
};
export default {
	listCate,
};
