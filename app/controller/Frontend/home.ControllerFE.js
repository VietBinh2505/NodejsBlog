const {articleServiceFE, categServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const folderView 	= __path_views_blog + "pages/home/";
const layoutFE 	= __path_views_blog + "frontend";
const pageTitleIndex = "Publish Page"; 

const listItem =  async(req, res) => {	
	let itemSpecial = await articleServiceFE.listArticleSpecial(null, "ItemSpecial"); // bài viết toppost
	let itemNew = await articleServiceFE.listArticleSpecial(null, "itemNew");// bài viết mới
	let ItemCateg = await categServiceFE.listCategFE(null, "categ-in-menu"); // Hiển thị các cate ở menu
	let ArticleRandom = await articleServiceFE.listArticleSpecial(null, "ArticleRandom"); // lấy ra các bài viết ngẫu nhiên
	try {
		return res.render(`${folderView}indexHomeBlog`, {
         pageTitle: pageTitleIndex,
         layout: layoutFE,
         top_post: true,
			itemSpecial,
			itemNew,
			ItemCateg,
			ArticleRandom,
      }); 
	} catch (error) {
		console.log(error);
		console.log("error---listItemFE");
	}
};
export default {
	listItem,
};
