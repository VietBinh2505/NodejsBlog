const groupSchema = require(__path_schemas + "groups.Schemas");

const listRoom = (data) =>{
   return new Promise(async(resolve, reject)=>{
      let listRoom = await groupSchema.listRoom(data);
      if(listRoom){
         return resolve(listRoom);
      }
      return reject("listRoom bị lỗi phía service");
   }); 
}; 
export default {
   listRoom,
};
