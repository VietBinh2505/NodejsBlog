import boxDirectChat from "./boxDirectChat.socket";
import boxUserOneline from "./boxUserOnline.socket";
import boxRoom from "./boxRoom.socket";
let initSocket = (io) => {
   boxDirectChat(io);
   boxUserOneline(io);
   boxRoom(io);
};

module.exports = initSocket;
