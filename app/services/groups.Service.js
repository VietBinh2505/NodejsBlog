import groupSchema from "../schemas/groups.Schemas";
const countTotal = (currStatus, keyword) =>{
   return new Promise(async(resolve, reject)=>{
      let resultCount = await groupSchema.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return reject();
      }
   }); 
};
const showGroupsService = (currStatus, keyword, skip, limit, sort) =>{
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
const saveGroups = (itemId, item) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.saveGroups(itemId, item);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const deleteGroups = (itemId) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.deleteGroups(itemId);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const deleteMulti = (idItem, statusNew) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.deleteMulti(idItem, statusNew);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeStatus = (id, data) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.changeStatus(id, data);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeStatusMulti = (idItem, data) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await groupSchema.changeStatusMulti(idItem, data);
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
   deleteMulti,
   changeStatus,
   changeStatusMulti,
   changeOrdering,
   countDocument
}; 
