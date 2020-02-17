const {itemMessage} = require(__path_sv_Chat + "index.service");
const folderView 	= __path_views_chat + "pages/home/";
const layoutChat 	= __path_views_chat + "main";

const HomeChat = async(req, res) => {
	try {
		let message = await itemMessage.listMessage(null, null);
		return res.render(`${folderView}index.viewHomeChat.ejs`, {
			layout: layoutChat,
			message,
		});
	} catch (error) {
		console.log(error);
		console.log("Loi tai HomeChat");
	}
};


export default {
	HomeChat,
};

