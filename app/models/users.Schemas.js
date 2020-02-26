import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var UsersSchema = new Schema({ 
   username: String, 
   slug: String,
   status: { type: String, default: "inactive" },
   ordering: Number,
   nameLogin: String,
   password: String,
   content: String,
   avatar: String,
   reqTo: [ //gửi cho ai
      {
         username: String,
         avatar: String
      }
   ],
   reqFrom: [ //ai gửi cho mình
      {
         username: String,
         avatar: String,
      }
   ],
   friendList: [ //ai gửi cho mình
      {
         username: String,
         avatar: String,
      }
   ],
   totalreq: Number,
   totalreq: Number,
   group: {
      id: String,
      name: String,
   },
   created: {
      name: String,
      user_id: Number,
      time: { type: Date, default: Date.now },
   },
   modified: {
      user_id: Number,
      name: String,
      time: { type: Date, default: Date.now },
   }
});
UsersSchema.statics = {
   saveUser(item, option = null){
      if(option == "add"){ //add
         return this.create(item);
      }else if(option == "edit"){ //edit
         return this.findOneAndUpdate({"_id": item.id}, item).exec();
      }else if(option == "edit_u"){
         return this.findOneAndUpdate({"group.id": item.id}, {"group.name": item.username}).exec();
      }else if(option == "deleGr"){
         return this.findOneAndUpdate({"group.id": item.id}, {"group.name": item}).exec();
      }
      if(option == "req-add-friend"){
         return this.updateOne({
               "username": item.fromUsername, //điều kiện
               "reqTo.username": {$ne: item.toUsername}, //$ne: ko nằm trong
               "friendList.username": {$ne: item.toUsername}, //chưa kết bạn.
            },{
               $push:{
                  reqTo: {
                     username: item.toUsername,
                     avatar: item.toAvatar,
                  } //thêm vào reqto tên người mình gửi lời mời
               },
            }
         );
      }
      if(option == "recerved-add-friend"){
         return this.updateOne({
            "username": item.toUsername, //điều kiện
            "reqFrom.username": {$ne: item.fromUsername}, //$ne: ko nằm trong
            "friendList.username": {$ne: item.fromUsername}, //chưa kết bạn.
            },{$push:{
                  reqFrom: {
                     username: item.fromUsername,
                     avatar: item.fromAvatar,
                  } //thêm vào reqFrom tên người mình gửi lời mời
            },$inc: {
               totalreq: +1
            }
         });
      }
      if(option == "add-Friend-Deny-Received"){
         return this.updateOne({
            "username": item.receivedName, //điều kiện
            },{$pull:{
                  reqFrom: {
                     username: item.senderName,
                  } //xoa ở reqFrom tên người mình gửi lời mời
            },$inc: {
               totalreq: -1
            }
         });
      }
      if(option == "add-Friend-Deny-Sender"){
         return this.updateOne({
            "username": item.senderName, //điều kiện
            },{$pull:{
                  reqTo: {
                     username: item.receivedName,
                  } //xoa ở reqFrom tên người mình gửi lời mời
            }
         });
      }
      if(option == "add-Friend-Accept-Received"){
         return this.updateOne({
            "username": item.receivedName, //điều kiện
            "friendList.username": {$ne: item.senderName},
            },{
               $push:{
                  friendList: {
                     username: item.senderName,
                     avatar: item.senderAvatar,
                  } //thêm vào reqFrom tên người mình gửi lời mời
               },
               $pull:{
                  reqFrom: {username: item.senderName} //xoa ở reqFrom tên người mình gửi lời mời
               },
               $inc: {totalreq: -1}
         });
      }
      if(option == "add-Friend-Accept-Sender"){
         return this.updateOne({
            "username": item.senderName, //điều kiện
            "friendList.username": {$ne: item.receivedName},
            },{
               $pull:{
                  reqTo: {
                     username: item.receivedName,
                  } //xoa ở reqFrom tên người mình gửi lời mời
               },
               $push:{
                  friendList: {
                     username: item.receivedName,
                     avatar: item.receivedAvatar,
                  } //thêm vào reqFrom tên người mình gửi lời mời
               }
         });
      }
   },
   countTotal(currStatus, keyword){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== ""){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else{
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      return this.countDocuments(objStt).exec();
   },
   findUser(currStatus, keyword, skip, limit, sort, filterGroupId){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else if(keyword !== ""){
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      if(filterGroupId !== "allvalue" && filterGroupId !== ""){
         objStt = {"group.id": filterGroupId};
      }
      return this.find(objStt).sort(sort).skip(skip).limit(limit).exec();
   },
   showInfoItemEdit(id){
      return this.find({"_id": id}).exec();
   },
   deleteUser(itemId, option = null){
      if(option == "one"){
         return this.deleteOne({"_id": itemId}).exec();
      }else if(option == "multi"){
         return this.deleteMany({ "_id": { $in: itemId }}).exec();
      }
   },
   countDocument(condition){
      return this.countDocuments(condition).exec();
   },
   changeOrdering(idItems, newOrdering, index){
      if(index !== ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering[index])}).exec();
      }else if(index === ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering)}).exec();
      }
   },
   changeStatus(id, data, option = null){
      if(option == "one"){
         return this.updateOne({"_id": id}, data).exec();
      }else if(option == "multi"){
         return this.updateMany({"_id": id}, data).exec();
      }
   },
   countDocument(condition){
      return this.countDocuments(condition).exec();
   },
   checkUserLogin(nameLogin){
      return this.findOne({"nameLogin": nameLogin})
      .select("password username ordering avatar nameLogin").exec();
   },
   checkCondition(item, option){
      if(option == "check-add-friend"){
         return this.findOne({
            username: item.fromUsername,
            "reqTo.username": {$eq: item.toUsername} 
         }).exec();
      }
      
   }
};
module.exports = mongoose.model(databaseConfig.col_user, UsersSchema);