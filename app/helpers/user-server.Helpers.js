module.exports = class UsersServer {
   constructor(){
      this.users = [];
   }
   addUser(id, username, avatar){
      let user = this.getUserByUsername(username);
      if(!user){
         let user = {id, username, avatar};
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
   getUserByUsername(username){
      return this.users.filter((user)=> user.username === username)[0];
   }
   getUser(id){
      return this.users.filter((user)=> user.id === id)[0];
   }

   getListUser(){
      return this.users;
   }
}