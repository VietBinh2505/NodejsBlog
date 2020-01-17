import itemSchema from "../schemas/item.Schema";
const showItemService = (currStatus, keyword, skip, limit) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await itemSchema.findItem(currStatus, keyword, skip, limit);
      if(item){
         return resolve(item);
      }else{
         return
      }
   });
};
const countFilter = (value) =>{
   return new Promise(async(resolve, reject)=>{
      let resultCount = await itemSchema.countFilter(value);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return
      }
   });
};
const countTotal = (currStatus, keyword) =>{
   return new Promise(async(resolve, reject)=>{
      let resultCount = await itemSchema.countTotal(currStatus, keyword);
      if(resultCount){
         return resolve(resultCount);
      }else{
         return
      }
   });
};
module.exports = {
   showItemService,
   countFilter,
   countTotal
};