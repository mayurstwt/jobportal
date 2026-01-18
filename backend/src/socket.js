const { Server } = require("socket.io");
const redis = require("./config/redis");

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socket.on("join", (userid) => {
      socket.join(userid);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
    });
  });
  return io;
};


const emitEvent = (userId, event, paylaod) => {
    if (io) {
        io.to(userId).emit(event, paylaod);
    }
}

module.exports = { initSocket, emitEvent };
