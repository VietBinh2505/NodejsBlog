const { userService } = require(__path_sv_BE + "index.Service");

const addFriend = async(req, res) => {
   let item = {};
   item.fromUsername = req.body.fromUsername;
   item.toUsername = req.body.toUsername;
   item.toAvatar = req.body.toAvatar;
   item.fromAvatar = req.body.frormAvatar;
   try {
      await userService.saveUser(item, "req-add-friend");
      await userService.saveUser(item, "recerved-add-friend");
   } catch (error) {
      console.log(error);
      console.log("loi tai addfriend");
   }
   return res.json(item);
};


export default {
	addFriend,
};

