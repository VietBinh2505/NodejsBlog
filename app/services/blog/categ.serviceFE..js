const CategSchema = require(__path_schemas + "categ.Schemas");

const listCategFE = (params = null, option = null) =>{
   return new Promise(async(resolve, reject)=>{
      let resultList = await CategSchema.listCategFE(params, option);
      if(resultList){
         return resolve(resultList);
      }else{
         return reject("loi sv: resultList");
      } 
   }); 
};
export default {
   listCategFE,
};
