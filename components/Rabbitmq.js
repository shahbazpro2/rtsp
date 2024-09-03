import amqp from "amqplib";

// Function to consume messages from RabbitMQ and emit to Socket.IO clients
export async function Rabbitmq(io) {
  try {
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
