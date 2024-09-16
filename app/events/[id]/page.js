"use client";
import DetectionHistory from "@/components/DetectionHistory";
import SingleRtsp from "@/components/SingleRtsp";
import { useParams } from "next/navigation";
import "react-medium-image-zoom/dist/styles.css";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import DynamicIconMapping from "@/components/DynamicIconMapping";

const currentDate = moment.tz(moment(), moment.tz.guess()).format("YYYY-MM-DD");

const Event = () => {
  const params = useParams();
  const [cameraData, setCameraData] = useState(null);
  const id = params?.id?.replaceAll("%20", " ");

  useEffect(() => {
    setCameraData({ id });
  }, [id]);

  const selectedCamera = cameraData?.id || id;

  return (
    <>
      <div className="flex justify-center items-center mt-7">
        <div className="relative" id="container">
          <DynamicIconMapping setCameraData={setCameraData} cameraData={cameraData} />
          <div className="text-2xl my-3 text-center font-bold">{selectedCamera}</div>
          <SingleRtsp id={selectedCamera} />
          <DetectionHistory cameraId={selectedCamera} date={currentDate} />
        </div>
      </div>
    </>
  );
};

export default Event;
