import itemSchema from "../schemas/item.Schema";
const showItemService = (currStatus, keyword) =>{
   return new Promise(async(resolve, reject)=>{
      let item = await itemSchema.findItem(currStatus, keyword);
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
const itemSeached = (keyword) =>{
   return new Promise(async(resolve, reject)=>{
      let itemSeached = await itemSchema.itemSeached(keyword);
      if(resultCount){
         return resolve(itemSeached);
      }else{
         return
      }
   });
};

module.exports = {
   showItemService,
   countItemStt,
   countFilter,
   itemSeached,
};