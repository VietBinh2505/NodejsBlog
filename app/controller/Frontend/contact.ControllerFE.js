const folderView 	= __path_views_blog + "pages/contact/";
const layoutFE 	= __path_views_blog + "frontend";
const pageTitleIndex = "Contact Page"; 

const listContact =  async(req, res) => {	
	try {
		return res.render(`${folderView}index.contactBlog.ejs`, {
			pageTitle: pageTitleIndex,
			layout: layoutFE,
			top_post: false,
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
