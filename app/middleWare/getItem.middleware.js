const {articleServiceFE, categServiceFE} = require(__path_sv_FE + "index.ServiceFE");

const getCategMenu = async(req, res, next) =>{
   let ItemCateg = null;
   try {
      ItemCateg = await categServiceFE.listCategFE(null, "categ-in-menu"); // Hiển thị các cate ở menu   
   } catch (error) {
      console.log(error);
      console.log(" loi tai getCategMenu");
   }
   res.locals.ItemCateg = ItemCateg;
   next();
};
const ArticleRandom = async(req, res, next) =>{
   let ArticleRandom = null;
   try {
      ArticleRandom = await articleServiceFE.listArticleSpecial(null, "ArticleRandom"); // lấy ra các bài viết ngẫu nhiên
   } catch (error) {
      console.log(error);
      console.log(" loi tai ArticleRandom");
   }
   res.locals.ArticleRandom = ArticleRandom;
   next();
};
module.exports = {
   getCategMenu,
   ArticleRandom
};
