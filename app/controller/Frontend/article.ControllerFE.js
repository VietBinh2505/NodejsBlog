const {articleServiceFE} = require(__path_sv_FE + "index.ServiceFE");
const folderView 	= __path_views_blog + "pages/home/";
const layoutFE 	= __path_views_blog + "frontend";
const pageTitleIndex = "Publish Page"; 

const listItem =  async(req, res) => {	
   let itemHome = await articleServiceFE.listArticleSpecial();
	try {
		res.render(`${folderView}indexHomeBlog`, {
         pageTitle: pageTitleIndex,
         layout: layoutFE,
         top_post: true,
         itemHome,
      }); 
	} catch (error) {
		console.log(error);
		console.log("error---listItemFE");
	}
};
export default {
	listItem,
};
