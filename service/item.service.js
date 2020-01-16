import itemSchema from "./../Schemas/item.Schema";
const itemService = () =>{
   return new Promise(async(resolve, reject)=>{
      let item = await itemSchema.findItem();
      if(item){
         return resolve(item);
      }else{
         return
      }
   });
};
const countItemStt = () =>{
   return new Promise(async(resolve, reject)=>{
      let item = await itemSchema.findItem();
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
module.exports = {
   itemService,
   countItemStt,
   countFilter,
};