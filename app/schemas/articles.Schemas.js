import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var ArticleSchema = new Schema({ 
   username: String, 
   status: { type: String, default: "inactive" },
   ordering: Number,
   content: String,
   avatar: String,
   categ: {
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
ArticleSchema.statics = {
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
   findUser(currStatus, keyword, skip, limit, sort, filterCateg){
      let objStt = {};
      if(currStatus === "all"){
			if(keyword !== undefined){
            objStt = {"username": new RegExp(keyword, "i")};
         }
      }else if(keyword !== ""){
         objStt = {"status": currStatus, "username": new RegExp(keyword, "i")};
      }
      if(filterCateg !== "allvalue" && filterCateg !== ""){
         objStt = {"categ.id": filterCateg};
      }
      if(filterCateg === "allvalue"){
         objStt = {};
      }
      return this.find(objStt).sort(sort).skip(skip).limit(limit).exec();
   },
   showInfoArticleEdit(id){
      return this.find({"_id": id}).exec();
   },
   saveArticle(itemId, item, option = null){
      if(option == "add"){ //add
         return this.create(item);
      }else if(option == "edit"){ //edit
         return this.findOneAndUpdate({"_id": itemId}, item).exec();
      }else if(option == "editcateg"){
         return this.findOneAndUpdate({"categ.id": itemId}, {"categ.name": item.username}).exec();
      }else if(option == "delecateg"){
         return this.findOneAndUpdate({"categ.id": itemId}, {"categ.name": item}).exec();
      }
   },
   deleteArticle(itemId, option = null){
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
};
module.exports = mongoose.model(databaseConfig.col_arti, ArticleSchema);