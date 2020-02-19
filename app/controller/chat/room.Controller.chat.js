const {roomService} = require(__path_sv_Chat + "index.service");
const { getParams} = require(__path_helpers + "index.helper");

const folderView 	= __path_views_chat + "pages/room/";
const layoutChat 	= __path_views_chat + "main";

const roomChat = async(req, res) => {
	let roomId = await getParams.getParam(req.params, "id", "");
	try {
		let roomInfo = await roomService.listRoom(roomId, "lay-data-cho-room");
		return res.render(`${folderView}index.viewRoom.ejs`, {
			layout: layoutChat,
			roomInfo,
			roomId,
		});
	} catch (error) {
		console.log(error);
		console.log("Loi tai HomeChat");
	}
};


export default {
	roomChat,
};

