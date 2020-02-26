function paramsUserConnectServer(elmInputUsername, elmInputAvatar) {
	return {
		username: elmInputUsername.val(),
		avatar: elmInputAvatar.val(),
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

function showTyping(data, templateTyping, elmFormChat) {
	console.log("1111");
	console.log(elmFormChat.val());
	if (data.showTyping) {
		let template = templateTyping.html();
		Mustache.parse(template);
		$(Mustache.render(template, { user: data.username })).insertBefore(elmFormChat);
	} else {
		$("p.show-typing").remove();
	}
};

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

function paramsUserSendAllMessage(elmInputMessage, elmInputUsername, elmInputAvatar) {
	return {
		content: elmInputMessage.val(),
		username: elmInputUsername.val(),
		avatar: elmInputAvatar.val(),
	}
};

function paramsUserTyping(elmInputUsername, showTyping) {
	return {
		username: elmInputUsername.val(),
		showTyping: showTyping,
	}
};
function paramsUserTypingFromRoom(elmInputUsername, showTyping, elmInputRoom) {
	return {
		username: elmInputUsername.val(),
		showTyping: showTyping,
		room: elmInputRoom.val(),
	}
}
function paramsUserConnectRoom(elmInputUsername, elmInputAvatar, elmInputRoom) {
	return {
		username: elmInputUsername.val(), //tên room
		roomID: elmInputRoom.val(), // id room
		avatar: elmInputAvatar.val(), // avatar room,
	}
}

function paramsUserSendAllMessageFromRoom(elmInputMessage, elmInputUsername, elmInputAvatar, elmInputRoom) {
	return {
		content: elmInputMessage.val(),
		username: elmInputUsername.val(),
		avatar: elmInputAvatar.val(),
		roomID: elmInputRoom.val(),
	}
}


function paramsUserSendRequestAddFriend(elmInputUsername, elmInputAvatar, toUsername, toAvatar) {
	return {
		fromUsername: elmInputUsername.val(),
		fromAvatar: elmInputAvatar.val(),
		toUsername: toUsername,
		toAvatar: toAvatar
	}
}

function paramsClientSendAddFriend(elmInputUsername, elmInputAvatar, socketID) {
	return {
		fromUsername: elmInputUsername.val(),
		fromAvatar: elmInputAvatar.val(), 
		toSocketID: socketID
	}
}

function showNotify(content) {
	$.notify({
		message: content,
	}, {
		allow_dismiss: true,
		type: "info",
		placement: {
			from: "bottom",
			align: "left",
		},
	});
}

// function showListUserOnline(data, $elmInputUsername, $elmInputRelationship,  $elmListUsers, $elmTotalUser){
//     let parseInfo=JSON.parse($elmInputRelationship.val());
//     let xhtml    = '';
//     for (let i = 0; i < data.length; i++) {
//         let user = data[i];
//         if($elmInputUsername.val() === user.username) continue;
//         let type = getRelationship(parseInfo, user.username);

//         let templateId      = '#template-user-online';
//         let $tmplUserOnline = $(templateId);

//         if( type !== null){
//             templateId += '-' + type;
//             $tmplUserOnline = $(templateId);
//         }

//         let template = $tmplUserOnline.html();
//         Mustache.parse(template);
//         xhtml += Mustache.render(template, { user });
//     }
//     $elmListUsers.html(xhtml);
//     $elmTotalUser.html(data.length - 1);
// }

// function getRelationship(objRelationship, value){
//     let keys=Object.keys(objRelationship);
//     for (let i=0; i< keys.length;i++) {
//         let key=keys[i];
//         for (let j = 0; j < objRelationship[key].length; j++) {
//             let item=objRelationship[key][j];
//             if (item.username === value) {
//                 return key;
//             }
//         }
//     }
//     return null;
// }

// $(function () {
//     var pathname = window.location.pathname
//     var $elmNav=$('#navbar-collapse .navbar-nav a');
//     $elmNav.each(function () {
//         var link = $(this).attr('href');
//         if (pathname === link) {
//             $(this).parent('li').addClass('active');
//         }
//     });
// });