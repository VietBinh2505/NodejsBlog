$(function () {
	let socket 					= io.connect("http://localhost:2505");
	let elmInputMessage     = $("input#message");
   let elmInputUsername 	= $('input[name="username"]');
	let elmInputAvatar 		= $('input[name="avatar"]');
	let prefixSocket 	      = $('input[name="prefixSocket"]').val();
	let elmFormChat         = $("form#form-chat"); 
   let elmlistMessage      = $("div#area-list-message");
   let templateChat 		   = $("#template-message");
   let templateNotifyError = $("#server_return_newMessage_error");
   let templateTyping      = $("#template-user-typing");  
	let elmTotalMember 		= $("span.total-member");
	let elmListUser 			= $("div#list-users");
	let templateUserOnline  = $("#template-user-online");
	let elmInputRoom 			= $('input[name="roomID"]');
	let elmTotalUsersOneline= $("span.total-user-online");

	let timeoutOBJ;
   let emojioneAreas       = elmInputMessage.emojioneArea({
		search: false
	});
	
	socket.on("connect", () => {
		socket.emit(`${prefixSocket}client_send_join_room`, paramsUserConnectRoom(elmInputUsername, elmInputAvatar, elmInputRoom));
	});
	socket.on(`${prefixSocket}send_typing`, (data)=>{
		showTyping(data, templateTyping, elmFormChat);
	});
	
	socket.on(`${prefixSocket}send_list_user`, (data) => {
		showAllUserOnline(data, templateUserOnline, elmInputUsername, elmListUser, elmTotalUsersOneline);
		elmTotalMember.html(data.length);
	});
	let cancelTyping = () =>{
      socket.emit(`${prefixSocket}client_send_typing`, paramsUserTypingFromRoom(elmInputUsername, false, elmInputRoom));
	};
	elmFormChat.submit(function () {
      socket.emit(`${prefixSocket}client_send_all_message`, paramsUserSendAllMessageFromRoom(elmInputMessage, elmInputUsername, elmInputAvatar, elmInputRoom));
      elmInputMessage.val("");
      emojioneAreas.data("emojioneArea").setText("");
      $("div#area-notify").remove();
      return false;
	});
	socket.on(`${prefixSocket}return_newMessage`, (data) => {
      showListMessage(data, elmInputUsername, elmlistMessage, templateChat);
	});
	socket.on(`${prefixSocket}return_newMessage_error`, (data) => {
      showError(data, templateNotifyError, elmFormChat);
   });
   elmInputMessage.data("emojioneArea").on("keyup paste emojibtn.click", function(){
      if (this.getText().length > 0) {
         clearTimeout(timeoutOBJ);
         timeoutOBJ = setTimeout(cancelTyping, 2000);
         socket.emit(`${prefixSocket}client_send_typing`, paramsUserTypingFromRoom(elmInputUsername, true, elmInputRoom));
      }
	});
});
