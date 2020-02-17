const chatSchema = require(__path_schemas + "chats.Schemas");

const saveMessage = (data) =>{
   return new Promise(async(resolve, reject)=>{
      let message = await chatSchema.saveMessage(data);
      if(message){
         return resolve(message);
      }
      return reject("tin nhắn bị lỗi phía service");
   }); 
}; 
const listMessage = (data, option) =>{
   return new Promise(async(resolve, reject)=>{
      let message = await chatSchema.listMessage(data, option);
      if(message){
         return resolve(message);
      }
      return reject("tin nhắn bị lỗi phía service");
   }); 
}; 
export default {
   saveMessage,
   listMessage,
};
