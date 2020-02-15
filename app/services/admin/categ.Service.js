const categSchema = require(__path_schemas + "categ.Schemas");
const showCategService = (params) =>{
   let skip = ((params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage); //lấy được số phần tử bỏ qua
   let sort = {};
   sort[params.sortFiled] = params.sortType;
   let limit = params.pagination.totalItemsPerPage; //lấy được số phần tử cần lấy
   let currStatus = params.currentStatus;
   let keyword = params.keyword;

   return new Promise(async(resolve, reject)=>{
      //console.log(11, keyword);
      let item = await categSchema.findItem(currStatus, keyword, skip, limit, sort);
      if(item){
         return resolve(item);
      }else{
         return reject();
      }
   });
};
const countTotal = (params) =>{
   let currStatus = params.currentStatus;
   let keyword = params.keyword;
   return new Promise(async(resolve, reject)=>{
      let resultCount = await categSchema.countTotal(currStatus, keyword);
      if(resultCount){ 
         return resolve(resultCount);
      }else if(resultCount === 0){
         resultCount = "0";
         return resolve(resultCount);
      }
      else{
         return reject();
      } 
   }); 
};
const countDocument = (condition) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await categSchema.countDocument(condition);
      if(items || items === 0){
         return resolve(items);
      }else{
         return reject("Trang thai khong có items");
      }
   });
};
const showInfoCategEdit = (id) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await categSchema.showInfoItemEdit(id);
      if(item){
         return resolve(item[0]);
      }else{
         return reject();
      }
   });
};
const saveCateg = (itemId, item, option = null) =>{
   let items = null;
   return new Promise(async(resolve, reject)=>{
      if(option == "edit"){
         item.modified = {
            user_id: 1,
            name: "admin",
            time: Date.now(),
         };
         items = await categSchema.saveItem(itemId, item, "edit");
      }else if(option == "add"){
         item.created = {
            name: "admin",
            user_id: 1,
            time: Date.now(),
         };
         items = await categSchema.saveItem(itemId, item, "add");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject("error-saveCateg");
      }
   });
};
const deleteCateg = (itemId, option = null) =>{
   return new Promise(async(resolve, reject)=>{
      let items = null;
      if(option == "one"){
         items = await categSchema.deleteItem(itemId, "one");
      }else if(option == "multi"){
         items = await categSchema.deleteItem(itemId, "multi");
      }
      if(items !== null){
         return resolve(items);
      }else{
         return reject("deleCateg");
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
         items = await categSchema.changeStatus(idItem, data,"one");
      }else if(option == "multi"){
         data.status = currStatus;
         items = await categSchema.changeStatus(idItem, data,"multi");
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
      let items = await categSchema.changeOrdering(idItem, newOrdering, index);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const showAllArticle = () =>{ // đổ ra ở 
   return new Promise(async(resolve, reject)=>{
      let items = await categSchema.showAllArticle();
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
export default {
   showCategService,
   countTotal,
   countDocument,
   showInfoCategEdit,
   saveCateg,
   deleteCateg,
   changeStatus,
   changeOrdering,
   showAllArticle
}; 
