import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
   username: String,
   status: String,
   ordering: Number
});
ItemSchema.statics = {
   findItem(currStatus, keyword, skip, limit){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else{
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      return this.find(objStt).sort({"ordering": "asc"}).skip(skip).limit(limit).exec();
   },
   countFilter(value){
      return this.countDocuments(value).exec();
   },
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
   }
};
module.exports = mongoose.model("item", ItemSchema);