import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

let ChatRoomSchema = new Schema({ 
   roomID: String,
   username: String, 
   content: String,
   avatar: String,
   created: { type: Date, default: Date.now },
});
ChatRoomSchema.statics = {
   saveMessage(data){
      return this.create(data);
   },
   listMessage(id){
      let find = {roomID: id};
      let select = "username content avatar created";
      return this.find(find).select(select).exec();
   }
};
module.exports = mongoose.model(databaseConfig.col_chat_room, ChatRoomSchema);