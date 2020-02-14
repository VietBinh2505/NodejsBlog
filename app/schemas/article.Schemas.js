import mongoose from "mongoose"; 
const Schema = mongoose.Schema;
const databaseConfig = require(__path_configs + "database.Config");

var ArticleSchema = new Schema({ 
   username: String, 
   status: { type: String, default: "inactive" },
   special: { type: String, default: "normal" },
   slug: String,
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
   // -------------------------------------------------------------------------------- //
   changeSpecial(id, data, option = null){
      if(option == "one"){
         return this.updateOne({"_id": id}, data).exec();
      }else if(option == "multi"){
         return this.updateMany({"_id": id}, data).exec();
      }
   }, 
   listArticleSpecial(params = null, option = null){
      let find = "";
      let select = "username created.name created.time categ avatar content";
      let limit = 3;
      let sort = "";
      if(option == "ItemSpecial"){
         find = {status: "active", special: "top_post"};
         sort = {ordering: "asc"};
      }
      if(option == "itemNew"){
         select = "username created.name created.time categ avatar content";
         find = {status: "active"};
         sort = {"created.time": "desc"};
      }
      if(params!== "" && option == "categnavbar"){
         select = "username created.name created.time categ avatar content";
         find = { status: "active", "categ.id": params};
         sort = {"created.time": "desc"};
      }
      if(option == "ArticleRandom"){
         return this.aggregate([
            {$match: {status: "active"}},
            {$project: {_id: 1, username: 1, created: 1, avatar: 1}},
            {$sample: {size: 1}}
         ]);
      }
      if(option == "ArticleOrther"){
         find = {status: "active", "_id": {$ne: params[0].id}, "categ.id": params[0].categ.id};
         sort = {"created.time": "desc"};
      }
      return this.find(find).select(select).limit(limit).exec();
   },
   getArticleFE(id, option){
      return this.find({"_id": id}).select("avatar categ username content created").exec();
   }
};
module.exports = mongoose.model(databaseConfig.col_arti, ArticleSchema);