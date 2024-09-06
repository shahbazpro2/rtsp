"use client";
import DetectionHistory from "@/components/DetectionHistory";
import { useParams } from "next/navigation";
import "react-medium-image-zoom/dist/styles.css";
const currentDate = new Date().toISOString().split("T")[0];
const page = () => {
  const params = useParams();
  console.log("params", params);
  return <DetectionHistory cameraId={params.id} date={currentDate} />;
};

export default page;
