
function showTyping(data, templateTyping, elmFormChat) {
	if (data.showTyping) {
		let template = templateTyping.html();
		Mustache.parse(template);
		$(Mustache.render(template, { user: data.username })).insertBefore(elmFormChat);
	} else {
		$("p.show-typing").remove();
	}
};
function paramsUserSendAllMessageFromRoom(elmInputMessage, elmInputUsername, elmInputAvatar, elmInputRoom) {
	return {
		content: elmInputMessage.val(),
		username: elmInputUsername.val(),
		avatar: elmInputAvatar.val(),
		roomID: elmInputRoom.val(),
	}
}
function paramsUserTypingFromRoom(elmInputUsername, showTyping, elmInputRoom) {
	return {
		username: elmInputUsername.val(),
		showTyping: showTyping,
		room: elmInputRoom.val(),
	}
}
function showListMessage(data, elmInputUsername, elmlistMessage, templateChat) {
	let userAvatar = "upload/users/" + data.avatar;
	let typeShow = "";
	let classUsername = "pull-left";
	let classCreated = "pull-right";

	if (elmInputUsername.val() == data.username) {
		typeShow = "right";
		classUsername = "pull-right";
		classCreated = "pull-left";
	}
	let template = templateChat.html();
	Mustache.parse(template);
	elmlistMessage.append(Mustache.render(template, {
		typeShow,
		classUsername,
		classCreated,
		userAvatar,
		data,
	}));
};
function showError(data, templateNotifyError, elmFormChat) {
	let template = templateNotifyError.html();
	Mustache.parse(template);
	$(Mustache.render(template, { data })).insertBefore(elmFormChat);
};
function paramsUserConnectRoom(elmInputUsername, elmInputAvatar, elmInputRoom) {
	return {
		username: elmInputUsername.val(), //tên room
		roomID: elmInputRoom.val(), // id room
		avatar: elmInputAvatar.val(), // avatar room,
	}
}

function showAllUserOnline(data, templateUserOnline, elmInputUsername, elmListUser, elmTotalUsers) {
	let template = templateUserOnline.html();
	Mustache.parse(template);
	let xhtml = "";
	data.forEach(user => {
		if (user.username !== elmInputUsername.val()) {
			xhtml += Mustache.render(template, { user });
		}
	});
	elmListUser.html(xhtml);
	elmTotalUsers.html(data.length - 1);
};