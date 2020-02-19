import boxDirectChat from "./boxDirectChat.socket";
import boxUserOneline from "./boxUserOnline.socket";
let initSocket = (io) => {
   boxDirectChat(io);
   boxUserOneline(io);
};

module.exports = initSocket;
