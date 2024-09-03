import amqp from "amqplib";
import { io } from "@/socket";

export async function GET(req, res) {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();
    console.log("iii", io);

    const queue = "Camera-Status";
    io.emit("camera-status", "test");
    await channel.assertQueue(queue, { durable: false });

    console.log("Waiting for messages in", queue);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log("Received message:", msg.content.toString());
        channel.ack(msg);
      }
    });

    return Response.json({ message: "Event started" });
  } catch (error) {
    console.error("Error receiving message:", error);
    return Response.json({ message: "Event failed" });
  }
}
