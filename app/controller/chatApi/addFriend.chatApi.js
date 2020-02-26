const { userService } = require(__path_sv_BE + "index.Service");

const addFriend = async(req, res) => {
   let item = {};
   item.fromUsername = req.body.fromUsername;
   item.toUsername = req.body.toUsername;
   item.toAvatar = req.body.toAvatar;
   item.fromAvatar = req.body.fromAvatar;
   try {
      let check = await userService.checkCondition(item, "check-add-friend");
      if(check === null){
         item.status = "success";
         await userService.saveUser(item, "req-add-friend");
         await userService.saveUser(item, "recerved-add-friend");
      }else{
         item.status = "fail";
      }
   } catch (error) {
      console.log(error);
      console.log("loi tai addfriend");
   }
   return res.json(item);
};
const addFriendDeny = async(req, res) =>{
   let item = {};
   item.senderName = req.body.senderName; //tên người gửi 
   item.receivedName = req.user.username;
try {
      await userService.saveUser(item, "add-Friend-Deny-Received");//xóa ở collection nhận (reqTo)
      await userService.saveUser(item, "add-Friend-Deny-Sender");//xóa ở collection gửi (reqForm)
   } catch (error) {
      console.log(error);
      console.log("loi tai addFriendDeny");
   }
   return res.json(item);
};
const addFriendAccept = async(req, res) =>{
   let item = {};
   item.senderName = req.body.senderName; //tên người gửi 
   item.senderAvatar = req.body.senderAvatar; //tên người gửi 
   item.receivedName = req.user.username;//tên người gửi 
   item.receivedAvatar = req.user.avatar;
   try {
      await userService.saveUser(item, "add-Friend-Accept-Received");//xóa ở collection nhận (reqTo)
      await userService.saveUser(item, "add-Friend-Accept-Sender");//xóa ở collection gửi (reqForm)
   } catch (error) {
      console.log(error);
      console.log("loi tai addFriendAccept");
   }
   return res.json(item);
};

export default {
   addFriend,
   addFriendDeny,
   addFriendAccept,
};

