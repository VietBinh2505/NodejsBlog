import moment from "moment";
const {chatRoom} 			= require(__path_sv_ChatRoom + "index.chatRoom");
const systemConfig 		= require(__path_configs + "system.Config");
const notify 				= require(__path_configs + "notify.Config");
const userRoom 			= require(__path_helpers + "index.helper");
const prefixSocket = "room_";
const boxUserOneline = (io) => {
	let RoomUser = new userRoom.userRoom(); 
	io.on("connection", (socket) => {
		socket.on(`${prefixSocket}client_send_join_room`, (data)=>{
			socket.join(data.roomID); // nhóm các id của user vào phòng có idroom
			RoomUser.addRoom(socket.id, data.username, data.avatar, data.roomID); //thêm các user vào phòng
			socket.to(data.roomID).emit(`${prefixSocket}send_list_user`, RoomUser.getListUser(data.roomID)); // gửi list user torng phòng đó ra từng phòng
		}); 
		
		socket.on(`${prefixSocket}client_send_all_message`, async (data) => {
			if(data.content.length > 0){
				let messageRoom = await chatRoom.ChatRoom(data);
				await socket.to(data.roomID).emit(`${prefixSocket}return_newMessage`, {
					content: messageRoom.content,
					username: messageRoom.username,
					avatar: messageRoom.avatar,
					roomID: messageRoom.roomID,
					created: moment(messageRoom.created).format(systemConfig.format_long_time),
				});
			}else{
				socket.emit(`${prefixSocket}return_newMessage_error`, {
					type: "Lỗi",
					content: notify.MESSAGE_ERROR,
				})
			}
		});

		socket.on(`${prefixSocket}client_send_typing`, (data) => {
			socket.to(data.room).emit(`${prefixSocket}send_typing`, { 
				username: data.username,
				showTyping: data.showTyping,
				// ko cần idroom nếu cần, giá trị id room là room
			});
		});
		socket.on("disconnect", () => {
			let user = RoomUser.removeUser(socket.id);
			if(user){
				socket.to(user.room).emit(`${prefixSocket}send_list_user`, RoomUser.getListUser(user.room));
			}
		});
	});
};

module.exports = boxUserOneline;