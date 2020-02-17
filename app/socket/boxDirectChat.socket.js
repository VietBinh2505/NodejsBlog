const {itemMessage} = require(__path_sv_Chat + "index.service");
const systemConfig 		= require(__path_configs + "system.Config");
import moment from "moment";

const boxDirectChat = (io) => {
	io.on("connection", (socket) => {
		socket.on("client_send_all_message", async (data) => {
			let message = await itemMessage.saveMessage(data);
			await io.emit("server_return_newMessage", {
				content: message.content,
				username: message.username,
				avatar: message.avatar,
				created: moment(message.created).format(systemConfig.format_long_time),
			});
		});
		
		socket.on("disconnect", () => {
			//console.log("baibai");
		});
	});
};

module.exports = boxDirectChat;