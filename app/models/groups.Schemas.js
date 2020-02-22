import mongoose from "mongoose";
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var GroupSchema = new Schema({ 
   username: String, 
   slug: String,
   status: { type: String, default: "inactive" },
   ordering: Number,
   group_acp: String,
   content: String,
   avatar: String,
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
GroupSchema.statics = {
   countTotal(currStatus, keyword){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else{
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      return this.countDocuments(objStt).exec();
   },
   findGroups(currStatus, keyword, skip, limit, sort){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else{
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      return this.find(objStt).select("username status ordering created modified group_acp avatar").sort(sort).skip(skip).limit(limit).exec();
   },
   showInfoGroupsEdit(id){
      return this.find({"_id": id}).exec();
   },
   saveGroups(itemId, item, option=null){
      if(option == "add"){
         return this.create(item);
      }else if(option == "edit"){
         return this.findOneAndUpdate({"_id": itemId}, item).exec();
      }
   },
   deleteGroups(itemId, option = null){
      if(option == "one"){
         return this.deleteOne({"_id": itemId}).exec();
      }else if(option == "multi"){
         return this.deleteMany({ "_id": { $in: itemId }}).exec();
      }
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
   changeOrdering(idItems, newOrdering, index){
      if(index !== ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering[index])}).exec();
      }else if(index === ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering)}).exec();
      }
   },
   changeGroupACP(id, data){
      return this.findOneAndUpdate({"_id": id}, data).exec();
   },
   showAllGropItem(){
      return this.find({}, {"_id": 1, "username": 1}).exec();
   },
   /*------------------------------------------------------ */
   listRoom(idRoom = null, option = null){
      let find = {status: "active"};
      let sort = {ordering: "desc"};
      let select = "username avatar";
      if(idRoom){
         find = {status: "active", _id: idRoom};
         select = "username avatar";
      }
      return this.find(find).sort(sort).select(select).exec();
   },
};
module.exports = mongoose.model(databaseConfig.col_groups, GroupSchema);