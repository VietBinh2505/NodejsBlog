const {chatRoom} 		= require(__path_sv_ChatRoom + "index.chatRoom");
const {roomService} = require(__path_sv_Chat + "index.service");
const { getParams} = require(__path_helpers + "index.helper");
const folderView 	= __path_views_chat + "pages/room/";
const layoutChat 	= __path_views_chat + "main";
const prefixSocket = "room_";

const roomChat = async(req, res) => {
	let id =  await getParams.getParam(req.params, "id", "");
	let roomId = await getParams.getParam(req.params, "id", "");
	try {
		let listMessage = await chatRoom.listMessage(id);
		let roomInfo = await roomService.listRoom(roomId, "lay-data-cho-room");
		return res.render(`${folderView}index.viewRoom.ejs`, {
			layout: layoutChat,
			roomInfo,
			roomId,
			prefixSocket,
			listMessage,
		});
	} catch (error) {
		console.log(error);
		console.log("Loi tai HomeChat");
	}
};


export default {
	roomChat,
};

