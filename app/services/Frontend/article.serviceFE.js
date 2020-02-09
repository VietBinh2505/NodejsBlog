const articleSchema = require(__path_schemas + "article.Schemas");

const listArticleSpecial = () =>{
   return new Promise(async(resolve, reject)=>{
      let resultList = await articleSchema.listArticleSpecial();
      if(resultList){
         return resolve(resultList);
      }else{
         return reject("loi sv: resultList");
      } 
   }); 
};
export default {
   listArticleSpecial,
};
