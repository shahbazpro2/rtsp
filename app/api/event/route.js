import { Connection } from "rabbitmq-client";
import amqp from "amqp";

export async function GET() {
  try {
    const rabbit = new Connection("amqp://NVR:NVR@localhost:5672");
    rabbit.on("error", (err) => {
      console.log("RabbitMQ connection error", err);
    });
    rabbit.on("connection", () => {
      console.log("Connection successfully (re)established");
    });

    // Consume messages from a queue:
    const sub = rabbit.createConsumer(
      {
        queue: "NVR-Alert",
        queueOptions: { durable: true },
        qos: { prefetchCount: 2 },
        // Optionally ensure an exchange exists
        exchanges: [{ exchange: "my-events", type: "topic" }],
        // With a "topic" exchange, messages matching this pattern are routed to the queue
        queueBindings: [{ exchange: "my-events", routingKey: "users.*" }],
      },
      async (msg) => {
        console.log("received message (NVR-Alert)", msg);
      }
    );

    // Handle consumer errors
    sub.on("error", (err) => {
      console.log("consumer error (NVR-Alert)", err);
    });

    // Declare a publisher
    const pub = rabbit.createPublisher({
      confirm: true,
      maxAttempts: 2,
      exchanges: [{ exchange: "my-events", type: "topic" }],
    });

    // Publish a message to a custom exchange
    await pub.send(
      { exchange: "my-events", routingKey: "users.visit" }, // metadata
      { id: 1, name: "Alan Turing" } // message content
    );

    // Or publish directly to a queue
    await pub.send("NVR-Alert", { id: 1, name: "Alan Turing" });

    // Clean up when you receive a shutdown signal
    async function onShutdown() {
      await pub.close();
      await sub.close();
      await rabbit.close();
    }
    process.on("SIGINT", onShutdown);
    process.on("SIGTERM", onShutdown);

    return Response.json({ message: "Event started" });
  } catch (e) {
    return Response.json({ message: "Event failed" });
  }
}
