import mongoose from "mongoose";
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var ItemSchema = new Schema({ 
   username: String, 
   status: { type: String, default: "inactive" },
   ordering: Number,
   content: String,
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
   findGroups(currStatus, keyword, skip, limit, sort){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else{
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      return this.find(objStt).sort(sort).skip(skip).limit(limit).exec();
   },
   showInfoGroupsEdit(id){
      return this.find({"_id": id}).exec();
   },
   saveGroups(itemId, item){
      if(itemId == ""){ //add
         return this.create(item);
      }else{ //edit
         return this.findOneAndUpdate({"_id": itemId}, item).exec();
      }
   },
   deleteMulti(itemId){
      return this.deleteMany({ "_id": { $in: itemId }}).exec();
   },
   deleteGroups(itemId){
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
};
module.exports = mongoose.model(databaseConfig.col_groups, ItemSchema);