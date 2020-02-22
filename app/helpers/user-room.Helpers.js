module.exports = class UsersRooms {
   constructor(){
      this.users = [];
   }
   addRoom(id, username, avatar, room){
      let user = this.getUserByUsername(username, room);
      if(!user){
         let user = {id, username, avatar, room};
         this.users.push(user);
      }
      return this.users;
   }
   removeUser(id){
      let user = this.getUser(id);
      if(user){
         this.users = this.users.filter((user)=> user.id !== id)
      }
      return user;
   }
   getUser(id){
      return this.users.filter((user)=> user.id === id)[0];
   }

   getUserByUsername(username, room){
      return this.users.filter((user)=> user.username === username && user.room === room)[0];
   }
   getListUser(room){
      let users = this.users.filter((user)=> user.room === room);
      let listUsername = users.map((user)=>{
         return user;
      });
      return listUsername;
   }
}
