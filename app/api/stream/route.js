import Stream from "node-rtsp-stream";

export async function GET() {
  if (!global.stream) {
    global.stream = new Stream({
      name: "Bunny",
      streamUrl: "rtsp://admin:zxcvbnm0.@190.92.4.249:554/cam/realmonitor?channel=1&subtype=0",
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
  }
  return Response.json({ message: "Streaming started" });
}
