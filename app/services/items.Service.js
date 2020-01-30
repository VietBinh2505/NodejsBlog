import itemSchema from "../schemas/items.Schemas";

const countTotal = (currStatus, keyword) =>{
   return new Promise(async(resolve, reject)=>{
      let resultCount = await itemSchema.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return reject();
      }
   }); 
};

const showItemService = (currStatus, keyword, skip, limit, sort) =>{
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
const saveItem = (itemId, item) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.saveItem(itemId, item);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const deleteItem = (itemId) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.deleteItem(itemId);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const deleteMulti = (idItem, statusNew) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.deleteMulti(idItem, statusNew);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeStatus = (id, data) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.changeStatus(id, data);
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
const changeStatusMulti = (idItem, data) =>{
   return new Promise(async(resolve, reject)=>{
      let items = await itemSchema.changeStatusMulti(idItem, data);
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
      if(items){
         return resolve(items);
      }else{
         return reject();
      }
   });
};
export default {
   countTotal,
   showItemService,
   showInfoItemEdit,
   saveItem,
   deleteItem,
   deleteMulti,
   changeStatus,
   changeStatusMulti,
   changeOrdering,
   countDocument
};
