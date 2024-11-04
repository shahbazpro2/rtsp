// server.js
const express = require("express");
const http = require("http");
const { Rabbitmq } = require("./Rabbitmq");
const { queues } = require("./constant");
const cors = require("cors");
const Stream = require("node-rtsp-stream");
const { default: axios } = require("axios");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
let currentQueueData = {
  [queues[0]]: {},
  [queues[1]]: {},
};
let stream, singleStream;

app.get("/stream", (req, res) => {
  const { stop } = req.query || {};
  console.log("stop", stop);

  const stream1 = () => {
    stream = new Stream({
      name: "Bunny",
      streamUrl: "rtsp://127.0.0.1:8554/ds-test",
      wsPort: 6789,
      /*  ffmpegOptions: {
      "-f": "mpegts",
      "-codec:v": "mpeg1video",
      "-b:v": "1000k",
      "-stats": "",
      "-r": 25,
      "-s": "1920x1080",
      "-bf": 0,
      "-codec:a": "mp2",
      "-ar": 44100,
      "-ac": 1,
      "-b:a": "128k",
    }, */
    });
  };
  if (stream) {
    stream.stop();
    stream = null
    if (stop === "true")
      return res.send({ message: "success" });
  }
  stream1();
  res.send({ message: "success" });
});

app.get("/stream/:id", (req, res) => {
  const { stop } = req.query || {};

  const parms = req.params.id;

  if (!currentQueueData[queues[0]]?.[parms]) {
    singleStream?.stop();
    singleStream = null;
    return res.status(400).send({ message: "Camera not found" });
  }

  const cameraData = currentQueueData[queues[0]]?.[parms] + ":554/Streaming/channels/102";
  if (!cameraData) {
    return res.send({ message: "Camera not found" });
  }
  const stream1 = () => {
    singleStream = new Stream({
      name: "Single Camera",
      streamUrl: cameraData,
      wsPort: 6790,
      ffmpegOptions: {
        "-f": "mpegts",
        "-codec:v": "mpeg1video",
        "-b:v": "512k", // Bitrate adjusted to 512 kbps
        "-r": 30, // Adjust FPS to 15
        "-s": "640x360", // Resolution matches the camera
        "-bf": 0,
        "-codec:a": "mp2",
        "-ar": 44100,
        "-ac": 1,
        "-b:a": "128k",
      },
    });
  };

  if (singleStream) {
    singleStream.stop();
    singleStream = null
    if (stop === "true")
      return res.send({ message: "success" });
  }

  stream1();
  res.send({ message: "success" });
});

const port = 8000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New client connected", currentQueueData[queues[0]]);

  socket.on("initialData", () => {
    io.emit('initialCamera', currentQueueData[queues[0]]);
    io.emit(queues[1], currentQueueData[queues[1]]);
  });

  Rabbitmq(currentQueueData, io);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const fetchCameraConfig = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/get_camera_config");
    const cameraConfig = response.data;

    // Set the currentQueueData for queues[0] with the API response
    currentQueueData[queues[0]] = cameraConfig;

    console.log("Camera configuration updated:", currentQueueData[queues[0]]);
  } catch (error) {
    console.error("Error fetching camera configuration:", error.message);
  }
};

server.listen(port, () => {
  fetchCameraConfig();
  console.log(`Server running at http://localhost:${port}`);
});
