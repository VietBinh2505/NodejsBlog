const UserServer 				= require(__path_helpers + "index.helper");
const boxUserOneline = (io) => {
	let users = new UserServer.userServer(); 
	io.on("connection", (socket) => {
		socket.emit("server_send_socketid", socket.id);
		socket.on("user_connect", async (data) => {
			users.addUser(socket.id, data.username, data.avatar);
			io.emit("server_send_all_user_online", users.getListUser());
		});
		
		socket.on("disconnect", () => {
			users.removeUser(socket.id);
			if(users){
				io.emit("server_send_all_user_online", users.getListUser());
			}
		});
	});
};

module.exports = boxUserOneline;