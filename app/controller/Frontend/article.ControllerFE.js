const {articleServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const { getParams } = require(__path_helpers + "index.helper");
const pageTitleIndex = "Article Page"; 
const folderView 	= __path_views_blog + "pages/article/";
const layoutFE 	= __path_views_blog + "frontend";

const listArticle =  async(req, res) => {	
	let idArticle = await getParams.getParam(req.params, "id", "");
	try {
		let article = await articleServiceFE.getArticleFE(idArticle, null);
		let articleOrther = await articleServiceFE.listArticleSpecial(article, "ArticleOrther"); // lấy ra các bài viết liên quan
		return res.render(`${folderView}index.acticleBlog.ejs`, {
			pageTitle: pageTitleIndex,
			layout: layoutFE,
			top_post: false,
			article,
			articleOrther,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listCateFE");
	}
};
export default {
	listArticle,
};

