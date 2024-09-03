import amqp from "amqplib";

const queueFetch = async (channel, queue) => {
  try {
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log("Received message:", messageContent);
        io.emit(queue, messageContent);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("Error receiving message:", err);
  }
};

export async function Rabbitmq(io) {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();

    const queue = "Camera-Status";
    queueFetch(channel, "Camera-Status");
    queueFetch(channel, "NVR-Alert");

    console.log("Waiting for messages in", queue);

    /*   io.emit("NVR-Alert", { "Camera 14": false, "camera x": false, "Camera 15": true, "Camera 16": false, "Camera 5": false, "Camera 9": false, "Camera 11": false, "Camera 12": false });
    io.emit("Camera-Status", {
      "Camera 5": "rtsp://admin:12345678k@10.10.10.220",
      "Camera 9": "rtsp://admin:12345678k@10.10.10.221",
      "Camera 11": "rtsp://admin:12345678k@10.10.10.221",
      "Camera 12": "rtsp://admin:12345678k@10.10.10.239",
      "Camera 14": "rtsp://admin:12345678k@10.10.10.235",
      "camera x": "rtsp://admin:12345678k@10.10.10.235:554/Streaming/Channels/102",
      "Camera 15": "rtsp://admin:12345678k@10.10.10.219",
      "Camera 16": "rtsp://admin:$$$DoNotEnter$$$@10.10.10.241",
    }); */
  } catch (error) {
    console.error(error);
  }

  return null;
}
