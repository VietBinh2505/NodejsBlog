const groupSchema = require(__path_schemas+ "groups.Schemas");
const countTotal = (params) =>{
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   return new Promise(async(resolve, reject)=>{
      let resultCount = await groupSchema.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return reject();
      }
   }); 
};
const showGroupsService = (params) =>{
   let skip = ((params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage); //lấy được số phần tử bỏ qua
   let sort = {};
   sort[params.sortFiled] = params.sortType;
   let limit = params.pagination.totalItemsPerPage; //lấy được số phần tử cần lấy
   let currStatus = params.currentStatus;
   let keyword = params.keyword;

   return new Promise(async(resolve, reject)=>{
      let item = await groupSchema.findGroups(currStatus, keyword, skip, limit, sort);
      if(item){
         return resolve(item);
      }else{
         return reject();
      }
   });
};
const showInfoGroupsEdit = (id) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await groupSchema.showInfoGroupsEdit(id);
      if(item){
         return resolve(item[0]);
      }else{
         return reject();
      }
   });
};
const saveGroups = (itemId, item, option = null) =>{
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "edit"){
         item.modified = {
            user_id: 1,
            name: "admin",
            time: Date.now(),
         };
         items = await groupSchema.saveGroups(itemId, item, "edit");
      }else if(option == "add"){
         item.created = {
            name: "admin",
            user_id: 1,
            time: Date.now(),
         };
         items = await groupSchema.saveGroups(itemId, item, "add");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject("loi o saveGroups");
      }
   });
};
const deleteGroups = (itemId, option = null) =>{
   return new Promise(async(resolve, reject)=>{
      let items = null;
      if(option == "one"){
         items = await groupSchema.deleteGroups(itemId, "one");
      }else if(option == "multi"){
         items = await groupSchema.deleteGroups(itemId, "multi");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject(error);
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
         items = await groupSchema.changeStatus(idItem, data,"one");
      }else if(option == "multi"){
         data.status = currStatus;
         items = await groupSchema.changeStatus(idItem, data,"multi");
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
      let items = await groupSchema.changeOrdering(idItem, newOrdering, index);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const countDocument = (condition) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.countDocument(condition);
      if(items || items === 0){
         return resolve(items);
      }else{
         return reject("Trang thai khong có items");
      }
   });
};
const changeGroupACP = (id, data) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.changeGroupACP(id, data);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const showAllGropItem = () =>{ // đổ ra ở 
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.showAllGropItem();
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
export default {
   countTotal,
   showGroupsService,
   showInfoGroupsEdit,
   saveGroups,
   deleteGroups,
   changeStatus,
   changeOrdering,
   countDocument,
   changeGroupACP,
   showAllGropItem,
}; 
