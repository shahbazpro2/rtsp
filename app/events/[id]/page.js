"use client";
import DetectionHistory from "@/components/DetectionHistory";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";
const currentDate = new Date().toISOString().split("T")[0];
const page = () => {
  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    if (!params.id) return;
    fetch(`http://localhost:8000/stream/${params.id}`)
      .then((response) => response.json())
      .then((data) => console.log("ddd", data.message))
      .catch((error) => console.error("Error starting stream:", error));
    const videoUrl = `ws://${ffmpegIP}:6790/`;
    const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
      autoplay: true,
    });
    console.log(player);
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center items-center mt-7">
        <div className="relative">
          <div id="video-canvas" style={{ height: 565, width: 1000 }}></div>
          <DetectionHistory cameraId={params.id} date={currentDate} />
        </div>
      </div>
    </>
  );
};

export default page;
