const userSchema = require(__path_schemas+ "users.Schemas");
const {FileHelper} = require(__path_helpers + "index.helper");
const countTotal = (params) =>{
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   return new Promise(async(resolve, reject)=>{
      let resultCount = await userSchema.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return reject();
      }
   }); 
};
const showUsersService = (params) =>{
   let skip = ((params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage); //lấy được số phần tử bỏ qua
   let sort = {};
   sort[params.sortFiled] = params.sortType;
   let limit = params.pagination.totalItemsPerPage; //lấy được số phần tử cần lấy
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   let filterGroupId =  params.filterGroupId;
   return new Promise(async(resolve, reject)=>{
      let item = await userSchema.findUser(currStatus, keyword, skip, limit, sort, filterGroupId);
      if(item !== undefined){
         return resolve(item);
      }else{
         return reject("Trang thai ko có items");
      }
   });
};
const showInfoItemEdit = (id) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await userSchema.showInfoItemEdit(id);
      if(item){
         return resolve(item[0]);
      }else{
         return reject();
      }
   });
};
const saveUser = (itemId, item, option = null) =>{
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "edit"){
         item.modified = {
            user_id: 1,
            name: "admin",
            time: Date.now(),
         };
         items = await userSchema.saveUser(itemId, item, "edit");
      }else if(option == "add"){
         item.created = {
            name: "admin",
            user_id: 1,
            time: Date.now(),
         };
         items = await userSchema.saveUser(itemId, item, "add");
      }else if(option == "edit_u"){
         items = await userSchema.saveUser(itemId, item, "edit_u");
      }else if(option == "deleGr"){
         items = await userSchema.saveUser(itemId, item, "deleGr");
      }
      if(items){
         return resolve(items); 
      }else{
         return reject();
      }
   });
};
const deleteUser = (itemId, option = null) =>{
   return new Promise(async(resolve, reject)=>{
      let items = null;
      let item = null
      if(option == "one"){
         item = await userSchema.showInfoItemEdit(itemId);
         let path = "public/upload/users/";
         FileHelper.removefile(path, item[0].avatar);
         items = await userSchema.deleteUser(itemId, "one");
      }else if(option == "multi"){
         if(Array.isArray(itemId)){
            for(let i = 0; i < itemId.length; i++){
               await userSchema.showInfoItemEdit(itemId).then((item)=>{
                  let path = "public/upload/users/";
                  FileHelper.removefile(path, item[i].avatar);
               });
            }
         }else{
            await userSchema.showInfoItemEdit(itemId).then((item)=>{
               let path = "public/upload/users/";
               FileHelper.removefile(path, item[0].avatar);
            });
         }
         items = await userSchema.deleteUser(itemId, "multi");
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
         items = await userSchema.changeStatus(idItem, data, "one");
      }else if(option == "multi"){
         data.status = currStatus;
         items = await userSchema.changeStatus(idItem, data, "multi");
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
      let items = await userSchema.changeOrdering(idItem, newOrdering, index);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const countDocument = (condition) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await userSchema.countDocument(condition);
      if(items !== undefined){
         return resolve(items);
      }else{
         return reject("Trang thai khong có items");
      }
   });
};
export default {
   countTotal,
   showUsersService,
   showInfoItemEdit,
   saveUser,
   deleteUser,
   changeStatus,
   changeOrdering,
   countDocument,
};
