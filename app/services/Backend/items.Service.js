const itemSchema = require(__path_schemas + "items.Schemas");

const countTotal = (params) =>{
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   return new Promise(async(resolve, reject)=>{
      let resultCount = await itemSchema.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return reject();
      } 
   }); 
};
const showItemService = (params) =>{
   let skip = ((params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage); //lấy được số phần tử bỏ qua
   let sort = {};
   sort[params.sortFiled] = params.sortType;
   let limit = params.pagination.totalItemsPerPage; //lấy được số phần tử cần lấy
   let currStatus = params.currentStatus;
   let keyword = params.keyword;

   return new Promise(async(resolve, reject)=>{
      let item = await itemSchema.findItem(currStatus, keyword, skip, limit, sort);
      if(item){
         return resolve(item);
      }else{
         return reject();
      }
   });
};
const showInfoItemEdit = (id) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await itemSchema.showInfoItemEdit(id);
      if(item){
         return resolve(item[0]);
      }else{
         return reject();
      }
   });
};
const saveItem = (itemId, item, option = null) =>{
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "edit"){
         item.modified = {
            user_id: 1,
            name: "admin",
            time: Date.now(),
         };
         items = await itemSchema.saveItem(itemId, item, "edit");
      }else if(option == "add"){
         item.created = {
            name: "admin",
            user_id: 1,
            time: Date.now(),
         };
         items = await itemSchema.saveItem(itemId, item, "add");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const deleteItem = (itemId, option = null) =>{
   return new Promise(async(resolve, reject)=>{
      let items = null;
      if(option == "one"){
         items = await itemSchema.deleteItem(itemId, "one");
      }else if(option == "multi"){
         items = await itemSchema.deleteItem(itemId, "multi");
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
   let items;
   return new Promise(async(resolve, reject)=>{
      if(option == "one"){
         data.status = status;
         items = await itemSchema.changeStatus(idItem, data,"one");
      }else if(option == "multi"){
         data.status = currStatus;
         items = await itemSchema.changeStatus(idItem, data,"multi");
      }
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeOrdering = (idItem, newOrdering, index) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.changeOrdering(idItem, newOrdering, index);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const countDocument = (condition) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.countDocument(condition);
      if(items || items === 0){
         return resolve(items);
      }else{
         return reject("Trang thai khong có items");
      }
   });
};
export default {
   countTotal,
   showItemService,
   showInfoItemEdit,
   saveItem,
   deleteItem,
   changeStatus,
   changeOrdering,
   countDocument,
};
