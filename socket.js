import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import { parse } from "url";
import { Rabbitmq } from "./components/Rabbitmq.js";

export let io;

const socketIo = (handle) => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
    Rabbitmq(io);

    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });

  return server;
};

export default socketIo;
