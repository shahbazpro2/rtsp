"use client";
import DetectionHistory from "@/components/DetectionHistory";
import DynamicIconMapping from "@/components/DynamicIconMapping";
import SingleRtsp from "@/components/SingleRtsp";
import moment from "moment-timezone";
import React from "react";

const currentDate = moment.tz(moment(), moment.tz.guess()).format("YYYY-MM-DD");

const Events = () => {
  const [cameraData, setCameraData] = React.useState(null);


  return (
    <div className="text-3xl mt-5 text-center container">
      <div className="flex flex-col items-center justify-center" id="container">
        <DynamicIconMapping setCameraData={setCameraData} cameraData={cameraData} />
        <div className="text-2xl mt-3">{cameraData?.id}</div>
        <div className="my-3">{cameraData && <SingleRtsp id={cameraData?.id} />}</div>
        {cameraData && <DetectionHistory cameraId={cameraData?.id} date={currentDate} />}
      </div>
    </div>
  );
};

export default Events;
