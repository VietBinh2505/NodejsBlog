const articleSchemas = require(__path_schemas+ "article.Schemas");
const {FileHelper} = require(__path_helpers + "index.helper");
const uploadFolder = "public/upload/article/";
const countTotal = (params) =>{
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   return new Promise(async(resolve, reject)=>{
      let resultCount = await articleSchemas.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return reject();
      }
   }); 
};
const showArticleService = (params) =>{
   let skip = ((params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage); //lấy được số phần tử bỏ qua
   let sort = {};
   sort[params.sortFiled] = params.sortType;
   let limit = params.pagination.totalItemsPerPage; //lấy được số phần tử cần lấy
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   let filterCateg =  params.filterCateg;
   return new Promise(async(resolve, reject)=>{
      let item = await articleSchemas.findUser(currStatus, keyword, skip, limit, sort, filterCateg);
      if(item !== undefined){
         return resolve(item);
      }else{
         return reject("Trang thai ko có items");
      }
   });
};
const showInfoArticleEdit = (id) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await articleSchemas.showInfoArticleEdit(id);
      if(item){
         return resolve(item[0]);
      }else{
         return reject();
      }
   });
};
const saveArticle = (itemId, item, option = null) =>{
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "edit"){
         item.modified = {
            user_id: 1,
            name: "admin",
            time: Date.now(),
         };
         items = await articleSchemas.saveArticle(itemId, item, "edit");
      }else if(option == "add"){
         item.created = {
            name: "admin",
            user_id: 1,
            time: Date.now(),
         };
         items = await articleSchemas.saveArticle(itemId, item, "add");
      }
      else if(option == "editcateg"){
         items = await articleSchemas.saveArticle(itemId, item, "editcateg");
      }else if(option == "delecateg"){
         items = await articleSchemas.saveArticle(itemId, item, "delecateg");
      }
      if(items){
         return resolve(items); 
      }else{
         return reject();
      }
   });
};
const deleteArticle = (itemId, option = null) =>{
   return new Promise(async(resolve, reject)=>{
      let items = null;
      let item = null
      if(option == "one"){
         item = await articleSchemas.showInfoArticleEdit(itemId);
         let path = uploadFolder;
         FileHelper.removefile(path, item[0].avatar);
         items = await articleSchemas.deleteArticle(itemId, "one");
      }else if(option == "multi"){
         if(Array.isArray(itemId)){
            for(let i = 0; i < itemId.length; i++){
               await articleSchemas.showInfoArticleEdit(itemId).then((item)=>{
                  let path = uploadFolder;
                  FileHelper.removefile(path, item[i].avatar);
               });
            }
         }else{
            await articleSchemas.showInfoArticleEdit(itemId).then((item)=>{
               let path = uploadFolder;
               FileHelper.removefile(path, item[0].avatar);
            });
         }
         items = await articleSchemas.deleteArticle(itemId, "multi");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeStatus = (idItem, currStatus, option = null) =>{
   let status = (currStatus === "active") ? "inactive" : "active"; // thay dổi 1
   
   let data = {
		modified: {
			user_id: 1, 
			name: "admin",
			time: Date.now(),
		}
   };
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "one"){
         data.status = status
         items = await articleSchemas.changeStatus(idItem, data, "one");
      }else if(option == "multi"){
         data.status = currStatus;
         items = await articleSchemas.changeStatus(idItem, data, "multi");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeSpecial = (idItem, currStatus, option = null) =>{
   let special = (currStatus === "normal") ? "top_post" : "normal"; // thay dổi 1
   
   let data = {
		modified: {
			user_id: 1, 
			name: "admin",
			time: Date.now(),
		}
   };
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "one"){
         data.special = special
         items = await articleSchemas.changeSpecial(idItem, data, "one");
      }else if(option == "multi"){
         data.special = special;
         items = await articleSchemas.changeSpecial(idItem, data, "multi");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeOrdering = (idItem, newOrdering, index) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await articleSchemas.changeOrdering(idItem, newOrdering, index);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const countDocument = (condition) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await articleSchemas.countDocument(condition);
      if(items !== undefined){
         return resolve(items);
      }else{
         return reject("Trang thai khong có items");
      }
   });
};
export default {
   countTotal,
   showArticleService,
   showInfoArticleEdit,
   saveArticle,
   deleteArticle,
   changeStatus,
   changeOrdering,
   countDocument,
   changeSpecial,
};
