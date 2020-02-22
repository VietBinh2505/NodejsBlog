const {itemMessage} 		= require(__path_sv_Chat + "index.service");
const systemConfig 		= require(__path_configs + "system.Config");
const notify 				= require(__path_configs + "notify.Config");
import moment from "moment";

const boxDirectChat = (io) => {
	io.on("connection", (socket) => {
		socket.on("client_send_all_message", async (data) => {
			if(data.content.length > 0){
				let message = await itemMessage.saveMessage(data);
				await io.emit("server_return_newMessage", {
					content: message.content,
					username: message.username,
					avatar: message.avatar,
					created: moment(message.created).format(systemConfig.format_long_time),
				});
			}else{
				socket.emit("server_return_newMessage_error", {
					type: "Lỗi",
					content: notify.MESSAGE_ERROR,
				})
			}
		});
		socket.on("client_send_typing", (data) => {
			socket.broadcast.emit("server_send_typing", {
				username: data.username,
				showTyping: data.showTyping,
			});
		});
		socket.on("disconnect", () => {
		});
	});
};

module.exports = boxDirectChat;