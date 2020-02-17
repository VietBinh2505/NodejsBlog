import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var ChatSchema = new Schema({ 
   username: String, 
   content: String,
   avatar: String,
   created: { type: Date, default: Date.now },
});
ChatSchema.statics = {
   saveMessage(data){
      return this.create(data);
   },
   listMessage(data, option){
      return this.find().exec();
   }
};
module.exports = mongoose.model(databaseConfig.col_chat, ChatSchema);