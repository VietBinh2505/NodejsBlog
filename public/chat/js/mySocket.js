$(function () {
   let socket              = io.connect("http://localhost:2505");
   let elmInputMessage     = $("input#message");
   let elmInputUsername    = $('input[name="username"]');
   let elmInputAvatar 	   = $('input[name="avatar"]');
   let elmFormChat         = $("form#form-chat");
   let elmlistMessage      = $("div#area-list-message");
   let templateChat 		   = $("#template-message");
   let templateNotifyError = $("#server_return_newMessage_error");
   let templateTyping      = $("#template-user-typing");  
   let elmTotalUsers		   = $("span#total-user");
   let elmListUser 		   = $("div#list-users");
   let templateUserOnline  = $("#template-user-online");

   let timeoutOBJ;
   let emojioneAreas       = elmInputMessage.emojioneArea();

   socket.on("connect", () => {
      socket.emit("user_connect", {
         username: elmInputUsername.val(),
         avatar: elmInputAvatar.val(),
      });
   });
   socket.on("server_send_all_user_online", (data) => {
      let template = templateUserOnline.html();
      Mustache.parse(template);
      let xhtml = "";
      data.forEach(user => {
         if(user.username !== elmInputUsername.val()){
            xhtml+= Mustache.render(template, {user});
         }
      });
      elmListUser.html(xhtml);
      elmTotalUsers.html(data.length - 1);
   });
   socket.on("server_return_newMessage", (data) => {
      let userAvatar = "upload/users/" + data.avatar;
      let typeShow = "";
      let classUsername = "pull-left";
      let classCreated = "pull-right";

      if(elmInputUsername.val() == data.username ){
         typeShow        = "right";
         classUsername   = "pull-right";
         classCreated    = "pull-left";
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
   });
   socket.on("server_send_typing", (data)=>{
      if(data.showTyping){
         let template = templateTyping.html();
         Mustache.parse(template);
         $(Mustache.render(template, {user: data.username})).insertBefore(elmFormChat);
      }else{
         $("p.show-typing").remove();
      }
   });
   socket.on("server_return_newMessage_error", (data) => {
      let template = templateNotifyError.html();
      Mustache.parse(template);
      $(Mustache.render(template, {data})).insertBefore(elmFormChat);
   });
   elmFormChat.submit(function () {
      socket.emit("client_send_all_message", {
         content: elmInputMessage.val(),
         username: elmInputUsername.val(),
         avatar: elmInputAvatar.val(),
      });
      elmInputMessage.val("");
      emojioneAreas.data("emojioneArea").setText("");
      $("div#area-notify").remove();
      return false;
   });
   let cancelTyping = () =>{
      socket.emit("client_send_typing", {
         username: elmInputUsername.val(),
         showTyping: false,
      })
   };
   elmInputMessage.data("emojioneArea").on("keyup paste emojibtn.click", function(){
      if (this.getText().length > 0) {
         clearTimeout(timeoutOBJ);
         timeoutOBJ = setTimeout(cancelTyping, 1000);
         socket.emit("client_send_typing", {
            username: elmInputUsername.val(),
            showTyping: true,
         });
      }
   });
});
