$(function () {
   let socket                 = io.connect("http://localhost:2505");
   let elmInputMessage        = $("input#message");
   let elmInputUsername       = $('input[name="username"]');
   let elmInputRelationship   = $('input[name="relationship"]');
   let elmInputAvatar         = $('input[name="avatar"]');
   let prefixSocket           = $('input[name="prefixSocket"]').val();
   let elmFormChat            = $("form#form-chat");
   let elmlistMessage         = $("div#area-list-message");
   let templateChat           = $("#template-message");
   let templateNotifyError    = $("#server_return_newMessage_error");
   let templateTyping         = $("#template-user-typing");
   let elmTotalUsers          = $("span#total-user");
   let elmListUser            = $("div#list-users");
   let templateUserInvite     = $("#template-user-invite");
   let elmTotalUserInvite     = $("span.total-user-invite");

   let timeoutOBJ;
   let emojioneAreas = elmInputMessage.emojioneArea({
      search: false
   });

   socket.on("connect", () => {
      socket.emit(`${prefixSocket}user_connect`, paramsUserConnectServer(elmInputUsername, elmInputAvatar));
   });
   socket.on(`${prefixSocket}send_all_user_online`, (data) => {
      showAllUserOnline(data, elmInputRelationship, elmInputUsername, elmListUser, elmTotalUsers);
   });
   socket.on(`${prefixSocket}return_newMessage`, (data) => {
      showListMessage(data, elmInputUsername, elmlistMessage, templateChat);
   });
   socket.on(`${prefixSocket}send_typing`, (data) => {
      showTyping(data, templateTyping, elmFormChat);
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
   let cancelTyping = () => {
      socket.emit(`${prefixSocket}client_send_typing`, paramsUserTyping(elmInputUsername, false));
   };
   elmInputMessage.data("emojioneArea").on("keyup paste emojibtn.click", function () {
      if (this.getText().length > 0) {
         clearTimeout(timeoutOBJ);
         timeoutOBJ = setTimeout(cancelTyping, 1000);
         socket.emit(`${prefixSocket}client_send_typing`, paramsUserTyping(elmInputUsername, true));
      }
   });
   socket.on(`${prefixSocket}send_new_req_add_friend`, (data) => {
      let totalUserInvite = parseInt(elmTotalUserInvite.html());
      let template = templateUserInvite.html();
      Mustache.parse(template);
      if (totalUserInvite == 0) {
         $(`<li><ul class="menu"><li>`
            + Mustache.render(template, { data })
            + `</li></ul></li><li class="footer"><a href="#">View all</a></li>`)
            .insertAfter($("li#list-user-invite"));
      } else {
         $(Mustache.render(template, { data })).insertBefore($("div.user-invite").first());
      }
      elmTotalUserInvite.html(totalUserInvite + 1);
      showNotify(`${data.fromUsername}vừa gửi lời mời kết bạn tới bạn.`);
   });
   $(document).on("click", "button.control-add-friend", function (event) {
      let socketID = $(this).data("socketid");
      let toUsername = $(this).data("username");
      let toAvatar = $(this).data("avatar");
      let elmThis = $(this);
      let elmParent = $(this).parent();
      $.ajax({
         method: "post",
         dataType: "json",
         url: "api/addFriend",
         dataType: "json",
         data: paramsUserSendRequestAddFriend(elmInputUsername, elmInputAvatar, toUsername, toAvatar)
      }).done(function (data) {
         if(data.status === "fail"){
            showNotify("Bạn đã gửi lời mời kết bạn, vui lòng chờ xác nhận");
         }else{
            elmThis.remove();
            elmParent.append(` <button type="button" class="btn btn-block btn-info btn-w btn-sm">Sent</button>`);
            socket.emit(`${prefixSocket}client_send_add_friend`, paramsClientSendAddFriend(elmInputUsername, elmInputAvatar, socketID));
         }
      });
      return false;
   });
   $(document).on("click", "button.control-add-friend-deny", function (event) {
      let senderName = $(this).data("sendername");
      $.ajax({
         method: "POST",
         url: "/api/add-friend-deny",
         dataType: "json",
         data: {
            senderName: senderName,
         }
      }).done(function (data) {
         let totalUserInvite = parseInt(elmTotalUserInvite.html());
         elmTotalUserInvite.html(totalUserInvite - 1);

         $(`div.user-invite[data-name="${data.senderName}"]`).fadeOut();
      });
      return false;
   });

   $(document).on("click", "button.control-add-friend-accept", function (event) {
      let senderName = $(this).data("sendername");
      let senderAvatar = $(this).data("senderavatar");
      $.ajax({
         method: "POST",
         url: "/api/add-friend-accept",
         dataType: "json",
         data: {
            senderName: senderName,
            senderAvatar: senderAvatar
         }
      }).done(function (data) {
         let totalUserInvite = parseInt(elmTotalUserInvite.html());
         elmTotalUserInvite.html(totalUserInvite - 1);

         $(`div.user-invite[data-name="${data.senderName}"]`).fadeOut();
      });
      return false;
   });
});
