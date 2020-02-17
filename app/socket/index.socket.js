import boxDirectChat from "./boxDirectChat.socket";
let initSocket = (io) => {
   boxDirectChat(io);
};

module.exports = initSocket;
