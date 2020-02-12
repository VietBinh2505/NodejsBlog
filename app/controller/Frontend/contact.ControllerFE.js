const {categServiceFE, articleServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const folderView 	= __path_views_blog + "pages/contact/";
const layoutFE 	= __path_views_blog + "frontend";
const pageTitleIndex = "Contact Page"; 

const listContact =  async(req, res) => {	
	try {
		let ItemCateg = await categServiceFE.listCategFE(null, "categ-in-menu"); // lấy được cate trên menu
		let ArticleRandom = await articleServiceFE.listArticleSpecial(null, "ArticleRandom"); // lấy ra các bài viết ngẫu nhiên
		return res.render(`${folderView}index.contactBlog.ejs`, {
			pageTitle: pageTitleIndex,
			layout: layoutFE,
			top_post: false,
			ItemCateg,
			ArticleRandom,
		});
	} catch (error) {
		console.log(error);
		console.log("error---contactBlog");
	}

	res.send("conatact");
	
};
export default {
	listContact,
};
