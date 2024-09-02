import amqp from "amqplib";
import { Server } from "socket.io";

// Function to initialize Socket.IO
export function initializeSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });

  return io;
}

// Function to consume messages from RabbitMQ and emit to Socket.IO clients
export async function Rabbitmq() {
  try {
    const io = initializeSocket(server);
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();

    const queue = "Camera-Status";

    await channel.assertQueue(queue, { durable: false });

    console.log("Waiting for messages in", queue);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log("Received message:", messageContent);

        // Emit the message to all connected clients
        io.emit("camera-status", messageContent);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error receiving message:", error);
  }

  return null;
}
