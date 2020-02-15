const pageTitleIndex = "About Page"; 
const folderView 	= __path_views_blog + "pages/about/";
const layoutFE 	= __path_views_blog + "frontend";

const listItem =  async(req, res) => {	
	try {
		return res.render(`${folderView}index.aboutBlog.ejs`, {
			pageTitle: pageTitleIndex,
			layout: layoutFE,
			top_post: false,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listCateFE");
	}
};
export default {
	listItem,
};

