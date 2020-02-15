$(function () {
    let $elmInputMessage 	= $('input#message');
    let $elmInputUsername	= $('input[name="username"]');
    let $elmInputAvatar	    = $('input[name="avatar"]');
    let prefixSocket        = $('input[name="prefixSocket"]').val();
    let $elmFormChat 		= $('form#form-chat');
    let $elmListMessage 	= $('div#area-list-message');
    let $tmplMessageChat    = $('#template-chat-message');
    let $tmplNotifyError    = $('#template-notify-error');
    let $tmplUserTyping     = $('#template-user-typing');
    let $elmTotalUserOnline = $('span.total-user-online');
    let $elmTotalMember	    = $('span.total-member');
    let $elmListUsers	    = $('div#list-users');
    let $tmplUserOnline     = $('#template-user-online');
    let $elmInputRoom	    = $('input[name="roomID"]');
  
    let socket = io.connect('http://localhost:6969');
    let timeoutObj;
    let emojioneAreas = $elmInputMessage.emojioneArea({
        search: false
    });

    socket.on("connect", () => {
        socket.emit(`${prefixSocket}CLIENT_SEND_JOIN_ROOM`, paramsUserConnectRoom($elmInputUsername, $elmInputAvatar, $elmInputRoom));
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

    socket.on(`${prefixSocket}SEND_LIST_USER`, (data) => {
        showListUserOnline(data, $elmInputUsername, $tmplUserOnline, $elmListUsers, $elmTotalUserOnline);
        $elmTotalMember.html(data.length);
    });

    $elmFormChat.submit(function(){
        socket.emit(`${prefixSocket}CLIENT_SEND_ALL_MESSAGE`, paramsUserSendAllMessageFromRoom($elmInputMessage, $elmInputUsername, $elmInputAvatar, $elmInputRoom));
        $elmInputMessage.val('');
        emojioneAreas.data("emojioneArea").setText('');
        $("div#area-notify").remove();
        return false;
    });

    function cancelTyping() {
        socket.emit(`${prefixSocket}CLIENT_SEND_TYPING`, paramsUserTypingFromRoom($elmInputUsername, false, $elmInputRoom));
    }
    
    $elmInputMessage.data("emojioneArea").on("keyup paste emojibtn.click", function() {
        if (this.getText().length > 3) {
            clearTimeout(timeoutObj);
            timeoutObj = setTimeout(cancelTyping, 2000);
            socket.emit(`${prefixSocket}CLIENT_SEND_TYPING`, paramsUserTypingFromRoom($elmInputUsername, true, $elmInputRoom));
        }
    });

   

   

   

   
});