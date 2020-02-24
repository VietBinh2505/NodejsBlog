$(function () {
   let socket              = io.connect("http://localhost:2505");
   let elmInputMessage     = $("input#message");
   let elmInputUsername    = $('input[name="username"]');
   let elmInputAvatar 	   = $('input[name="avatar"]');
   let prefixSocket 	      = $('input[name="prefixSocket"]').val();
   let elmFormChat         = $("form#form-chat"); 
   let elmlistMessage      = $("div#area-list-message");
   let templateChat 		   = $("#template-message");
   let templateNotifyError = $("#server_return_newMessage_error");
   let templateTyping      = $("#template-user-typing");  
   let elmTotalUsers		   = $("span#total-user");
   let elmListUser 		   = $("div#list-users");
   let templateUserOnline  = $("#template-user-online");

   let timeoutOBJ;
   let emojioneAreas       = elmInputMessage.emojioneArea({
      search: false
   });

   socket.on("connect", () => {
      socket.emit(`${prefixSocket}user_connect`, paramsUserConnectServer(elmInputUsername, elmInputAvatar));
   });
   socket.on(`${prefixSocket}send_all_user_online`, (data) => {
      showAllUserOnline(data, templateUserOnline, elmInputUsername, elmListUser, elmTotalUsers);
   });
   socket.on(`${prefixSocket}return_newMessage`, (data) => {
      showListMessage(data, elmInputUsername, elmlistMessage, templateChat);
   });
   socket.on(`${prefixSocket}send_typing`, (data)=>{
      //showTyping(data, templateTyping, elmFormChat);
   });
   socket.on(`${prefixSocket}return_newMessage_error`, (data) => {
      showError(data, templateNotifyError, elmFormChat);
   });
   elmFormChat.submit(function () {
      socket.emit(`${prefixSocket}client_send_all_message`, paramsUserSendAllMessage(elmInputMessage, elmInputUsername, elmInputAvatar));
      elmInputMessage.val("");
      emojioneAreas.data("emojioneArea").setText("");
      $("div#area-notify").remove();
      return false;
   });
   let cancelTyping = () =>{
      socket.emit(`${prefixSocket}client_send_typing`, paramsUserTyping(elmInputUsername, false));
   };
   elmInputMessage.data("emojioneArea").on("keyup paste emojibtn.click", function(){
      if (this.getText().length > 0) {
         clearTimeout(timeoutOBJ);
         timeoutOBJ = setTimeout(cancelTyping, 1000);
         socket.emit(`${prefixSocket}client_send_typing`, paramsUserTyping(elmInputUsername, true));
      }
   });
   $(document).on("click", "button.control-add-friend", function(event){
      $.ajax({
         method: "post",
         dataType: "json",
         url: "api/addFriend",
         data:{
            fromUsername: elmInputUsername.val(),
            toUsername: $(this).data("username"),
            toAvatar: $(this).data("avatar"),
            frormAvatar: elmInputAvatar.val(),
         }
      }).done(function(data){
         console.log(data);
      });
   });
});
