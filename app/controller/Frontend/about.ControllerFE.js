const {categServiceFE, articleServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const pageTitleIndex = "About Page"; 
const folderView 	= __path_views_blog + "pages/about/";
const layoutFE 	= __path_views_blog + "frontend";

const listItem =  async(req, res) => {	
	try {
		let ItemCateg = await categServiceFE.listCategFE(null, "categ-in-menu"); // lấy được cate trên menu
		let ArticleRandom = await articleServiceFE.listArticleSpecial(null, "ArticleRandom"); // lấy ra các bài viết ngẫu nhiên
		return res.render(`${folderView}index.aboutBlog.ejs`, {
			pageTitle: pageTitleIndex,
			layout: layoutFE,
			top_post: false,
			ItemCateg,
			ArticleRandom
		});
	} catch (error) {
		console.log(error);
		console.log("error---listCateFE");
	}
};
export default {
	listItem,
};

