const {articleServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const folderView 	= __path_views_blog + "pages/home/";
const layoutFE 	= __path_views_blog + "frontend";
const pageTitleIndex = "Publish Page"; 

const listItem =  async(req, res) => {	
	let itemSpecial = await articleServiceFE.listArticleSpecial(null, "ItemSpecial");
	let itemNew = await articleServiceFE.listArticleSpecial(null, "itemNew");
	try {
		res.render(`${folderView}indexHomeBlog`, {
         pageTitle: pageTitleIndex,
         layout: layoutFE,
         top_post: true,
			itemSpecial,
			itemNew,
      }); 
	} catch (error) {
		console.log(error);
		console.log("error---listItemFE");
	}
};
export default {
	listItem,
};
