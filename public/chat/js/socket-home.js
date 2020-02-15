$(function () {
    

    let $elmInputMessage 	= $('input#message');
    let $elmInputUsername	= $('input[name="username"]');
    let $elmInputRelationship	    = $('input[name="relationship"]');
    let $elmInputAvatar	    = $('input[name="avatar"]');
    let $elmInputUserID	    = $('input[name="user"]');
    let $elmTotalUserInvite = $("span.total-user-invite");
    let prefixSocket        = $('input[name="prefixSocket"]').val();
    let $elmFormChat 		= $('form#form-chat');
    let $elmListMessage 	= $('div#area-list-message');
    let $tmplMessageChat    = $('#template-chat-message');
    let $tmplNotifyError    = $('#template-notify-error');
    let $tmplUserInvite     = $('#template-user-invite');
    let $tmplUserTyping     = $('#template-user-typing');
    let $elmTotalUser	    = $('span#total-user');
    
    let $elmListUsers	    = $('div#list-users');
    
    
    let socket              = io.connect('http://localhost:6969');
    let timeoutObj;
    let emojioneAreas = $elmInputMessage.emojioneArea({
        search: false
    });

    socket.on("connect", () => {
        socket.emit(`${prefixSocket}USER_CONNECT`, paramsUserConnectServer($elmInputUsername, $elmInputAvatar));
    });

    socket.on(`${prefixSocket}RETURN_ALL_MESSAGE`, (data) => {
        showListMessage(data, $elmInputUsername, $tmplMessageChat, $elmListMessage);
    });

    socket.on(`${prefixSocket}RETURN_ERROR`, (data) => {
        showError(data, $tmplNotifyError, $elmFormChat);
    });

    socket.on(`${prefixSocket}SEND_USER_TYPING`, (data) => {
        showTyping(data, $tmplUserTyping, $elmFormChat);
    });

    socket.on(`${prefixSocket}SEND_ALL_LIST_USER`, (data) => {
        showListUserOnline(data, $elmInputUsername, $elmInputRelationship, $elmListUsers, $elmTotalUser);
    });

    $elmFormChat.submit(function(){
        socket.emit(`${prefixSocket}CLIENT_SEND_ALL_MESSAGE`, paramsUserSendAllMessage($elmInputMessage, $elmInputUsername, $elmInputAvatar));
        $elmInputMessage.val('');
        emojioneAreas.data("emojioneArea").setText('');
        $("div#area-notify").remove();
        return false;
    });

    function cancelTyping() {
        socket.emit(`${prefixSocket}CLIENT_SEND_TYPING`, paramsUserTyping($elmInputUsername, false));
    }
    
    $elmInputMessage.data("emojioneArea").on("keyup paste emojibtn.click", function() {
        if (this.getText().length > 3) {
            clearTimeout(timeoutObj);
            timeoutObj = setTimeout(cancelTyping, 2000);
            socket.emit(`${prefixSocket}CLIENT_SEND_TYPING`, paramsUserTyping($elmInputUsername, true));
        }
    });

    socket.on(`${prefixSocket}SEND_NEW_REQUEST_ADD_FRIEND`, (data) => {
        let totalUserInvite     = parseInt($elmTotalUserInvite.html());

        let template = $tmplUserInvite.html();
        Mustache.parse(template); 

        if(totalUserInvite == 0) {
            $(`<li><ul class="menu"><li>` 
                + Mustache.render(template, { data }) 
                + `</li></ul></li><li class="footer"><a href="#">View all</a></li>`).insertAfter($("li#list-user-invite")
            );
        }else {
            $(Mustache.render(template, { data })).insertBefore($('div.user-invite').first());
        }

        $elmTotalUserInvite.html(totalUserInvite + 1);
        showNotify(`${data.fromUsername} vừa gửi lời mời kết bạn đến bạn !`);
       
    });
  
    $(document).on("click", "button.control-add-friend" , function(event) {
        let toSocketID  = $(this).data("socketid");
        let toUsername  = $(this).data("username");
        let toAvatar    = $(this).data("avatar");
        let $elmThis    = $(this);
        let $elmParent  = $(this).parent();

        $.ajax({
            method: "POST",
            url: "/api/add-friend",
            dataType: "json",
            data: paramsUserSendRequestAddFriend($elmInputUsername, $elmInputAvatar, toUsername, toAvatar)
        }).done(function( data ) {

            if(data.status==="fail"){
                showNotify('Bạn đã gửi lời mời kết bạn, vui lòng chờ xác nhận!')
            }else{
                $elmThis.remove();
                $elmParent.append(`<button type="button" class="btn btn-block btn-info btn-w btn-sm">Sent</button>`);
                socket.emit(`${prefixSocket}CLIENT_SEND_ADD_FRIEND`, paramsClientSendAddFriend($elmInputUsername, $elmInputAvatar, toSocketID));
            }
        });
    });

    $(document).on("click", "button.control-add-friend-deny" , function(event) {
        let senderName = $(this).data("sendername");
        $.ajax({
            method: "POST",
            url: "/api/add-friend-deny",
            dataType: "json",
            data: {
                senderName: senderName,
            }
        }).done(function( data ) {
            let totalUserInvite     = parseInt($elmTotalUserInvite.html());
            $elmTotalUserInvite.html(totalUserInvite - 1);

            $(`div.user-invite[data-name="${data.senderName}"]`).fadeOut();
        });
        return false;
    });

    $(document).on("click", "button.control-add-friend-accept" , function(event) {
        let senderName      = $(this).data("sendername");
        let senderAvatar    = $(this).data("senderavatar");
        $.ajax({
            method: "POST",
            url: "/api/add-friend-accept",
            dataType: "json",
            data: {
                senderName: senderName,
                senderAvatar: senderAvatar
            }
        }).done(function( data ) {
            let totalUserInvite     = parseInt($elmTotalUserInvite.html());
            $elmTotalUserInvite.html(totalUserInvite - 1);

            $(`div.user-invite[data-name="${data.senderName}"]`).fadeOut();
        });
        return false;
    });
});