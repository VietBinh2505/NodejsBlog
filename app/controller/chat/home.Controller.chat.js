const folderView 	= __path_views_chat + "pages/home/";
const layoutChat 	= __path_views_chat + "main";

const HomeChat =  async(req, res) => {	
	return res.render(`${folderView}index.viewHomeChat.ejs`, {
		layout: layoutChat,
	});
};


export default {
	HomeChat,
};

