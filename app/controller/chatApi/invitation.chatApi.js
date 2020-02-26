const {roomService}         = require(__path_sv_Chat + "index.service");
const folderView 	         = __path_views_chat + "pages/";

const pageTitleIndex = "Danh sách lời mời";
const layoutChat 	= __path_views_chat + "main";
const invitationReceive = async(req, res) => {
   return res.render(`${folderView}invitation/receive.invitation.ejs`, {
      pageTitle: pageTitleIndex,
      layout: layoutChat,
   });
}; 
const invitationSend = async(req, res) =>{
   return res.render(`${folderView}invitation/send.invitation.ejs`, {
      pageTitle:pageTitleIndex,
      layout: layoutChat,
   });
};
const listRoom = async(req, res) =>{
   let listRooms = await roomService.listRoom(null, "lay-data-cho-home");
   return res.render(`${folderView}list-room/listRoom.ejs`, {
      pageTitle:pageTitleIndex,
      layout: layoutChat,
      listRooms,
   });
};
const friends = async(req, res) =>{
   return res.render(`${folderView}friends/friends.ejs`, {
      pageTitle:pageTitleIndex,
      layout: layoutChat,
   });
};
export default {
   invitationReceive,
   invitationSend,
   listRoom,
   friends,
};

