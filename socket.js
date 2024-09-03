import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import { parse } from "url";
import { Rabbitmq } from "./Rabbitmq.js";
import { queues } from "./constant.js";

export let io;

let currentQueueData = {
  [queues[0]]: {},
  [queues[1]]: {},
};

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
    Rabbitmq(currentQueueData, socket);

    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });

  return server;
};

export default socketIo;
