const {itemMessage, roomService} = require(__path_sv_Chat + "index.service");
const { userService } = require(__path_sv_BE + "index.Service");
const folderView 	= __path_views_chat + "pages/home/";
const layoutChat 	= __path_views_chat + "main";
const prefixSocket = "server_";
const HomeChat = async(req, res) => {
	try {
		let message = await itemMessage.listMessage(null, null);
		let listRooms = await roomService.listRoom(null, "lay-data-cho-home");
		return res.render(`${folderView}index.viewHomeChat.ejs`, {
			layout: layoutChat,
			message,
			listRooms,
			prefixSocket,
		});
	} catch (error) {
		console.log(error);
		console.log("Loi tai HomeChat");
	}
};


export default {
	HomeChat,
};

