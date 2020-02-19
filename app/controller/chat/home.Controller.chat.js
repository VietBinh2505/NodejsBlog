const {itemMessage, boxRoomService} = require(__path_sv_Chat + "index.service");
const folderView 	= __path_views_chat + "pages/home/";
const layoutChat 	= __path_views_chat + "main";

const HomeChat = async(req, res) => {
	try {
		let message = await itemMessage.listMessage(null, null);
		let listRooms = await boxRoomService.listRoom();
		return res.render(`${folderView}index.viewHomeChat.ejs`, {
			layout: layoutChat,
			message,
			listRooms,
		});
	} catch (error) {
		console.log(error);
		console.log("Loi tai HomeChat");
	}
};


export default {
	HomeChat,
};

