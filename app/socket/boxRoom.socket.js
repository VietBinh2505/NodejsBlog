const userRoom 				= require(__path_helpers + "index.helper");
const boxUserOneline = (io) => {
	let RoomUser = new userRoom.userRoom(); 
	io.on("connection", (socket) => {
		socket.on("client_send_join_room", (data)=>{
			socket.join(data.roomID); // nhóm các id của user vào phòng có idroom
			RoomUser.addRoom(socket.id, data.username, data.avatar, data.roomID); //thêm các user vào phòng
			io.to(data.roomID).emit("server_send_list_user", RoomUser.getListUser(data.roomID)); // gửi list user torng phòng đó ra từng phòng
		}); 
		socket.on("disconnect", () => {
			let user = RoomUser.removeUser(socket.id);
			if(user){
				io.to(user.room).emit("server_send_list_user", RoomUser.getListUser(user.room));
			}
		});
	});
};

module.exports = boxUserOneline;