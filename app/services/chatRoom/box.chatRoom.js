const ChatRoomSchema = require(__path_schemas + "chatRoom.Schemas");

const ChatRoom = (data) =>{
   return new Promise(async(resolve, reject)=>{
      let ChatRoom = await ChatRoomSchema.saveMessage(data);
      if(ChatRoom){
         return resolve(ChatRoom);
      }
      return reject("ChatRoom bị lỗi phía service");
   }); 
}; 
const listMessage = (id) =>{
   return new Promise(async(resolve, reject)=>{
      let listMessage = await ChatRoomSchema.listMessage(id);
      if(listMessage){
         return resolve(listMessage);
      }
      return reject("ChatRoom bị lỗi phía service");
   }); 
}; 

export default {
   ChatRoom,
   listMessage,
};
