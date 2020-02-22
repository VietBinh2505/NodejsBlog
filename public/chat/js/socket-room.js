$(function () {
	let socket 					= io.connect("http://localhost:2505");
	let elmInputRoom 			= $('input[name="roomID"]');
	let elmInputUsername 	= $('input[name="username"]');
	let elmInputAvatar 		= $('input[name="avatar"]');
	let templateUserOnline  = $("#template-user-online");
	let elmTotalUsersOneline= $("span.total-user-online");
	let elmTotalMember 		= $("span.total-member");
	let elmListUser 			= $("div#list-users");
	socket.on("connect", () => {
		socket.emit("client_send_join_room", {
			username: elmInputUsername.val(), //tên room
			roomID: elmInputRoom.val(), // id room
			avatar: elmInputAvatar.val(), // avatar room,
		});
		socket.on("server_send_list_user", (data) => {
			let template = templateUserOnline.html();
			Mustache.parse(template);
			let xhtml = "";
			data.forEach(user => {
				if (user.username !== elmInputUsername.val()) {
					xhtml += Mustache.render(template, { user });
				}
			});
			elmListUser.html(xhtml);
			elmTotalUsersOneline.html(data.length - 1);
			elmTotalMember.html(data.length);
		});
	});
});
