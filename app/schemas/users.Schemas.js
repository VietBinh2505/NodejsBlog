import mongoose from "mongoose";
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var ItemSchema = new Schema({ 
   username: String, 
   status: { type: String, default: "inactive" },
   ordering: Number,
   content: String,
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
ItemSchema.statics = {
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
   findItem(currStatus, keyword, skip, limit, sort, filterGroupId){
      let objStt = {};

      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }
      if(keyword !== ""){
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      if(filterGroupId !== "allvalue"){
         objStt = {"group.id": filterGroupId};
      }else if(filterGroupId === "allvalue"){
         objStt = {};
      }
      return this.find(objStt).select("username status ordering created modified group.name").sort(sort).skip(skip).limit(limit).exec();
   },
   showInfoItemEdit(id){
      return this.find({"_id": id}).exec();
   },
   saveItem(itemId, item){
      if(itemId == ""){ //add
         return this.create(item);
      }else{ //edit
         if(item.username){
            return this.findOneAndUpdate({"_id": itemId}, item).exec();
         }else if(!item.username){
            return this.findOneAndUpdate({"group.id": itemId}, {"group.name": item}).exec();
         }
      }
   },
   deleteMulti(itemId){
      return this.deleteMany({ "_id": { $in: itemId }}).exec();
   },
   countDocument(condition){
      return this.countDocuments(condition).exec();
   },
   deleteItem(itemId){
      return this.deleteOne({"_id": itemId}).exec();
   },
   changeOrdering(idItems, newOrdering, index){
      if(index !== ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering[index])}).exec();
      }else if(index === ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering)}).exec();
      }
   },
   changeStatus(id, data){
      return this.updateOne({"_id": id}, data).exec();
   },
   changeStatusMulti(id, data){
      return this.updateMany({"_id": id}, data).exec();
   },
   changeOrdering(idItems, newOrdering, index){
      if(index !== ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering[index])}).exec();
      }else if(index === ""){
         return this.updateOne({"_id": idItems}, {"ordering": parseInt(newOrdering)}).exec();
      }
   },
   countDocument(condition){
      return this.countDocuments(condition).exec();
   },
};
module.exports = mongoose.model(databaseConfig.col_user, ItemSchema);