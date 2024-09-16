import Stream from "node-rtsp-stream";

export async function StreamComp() {
  const stream = new Stream({
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

  return null;
}
