"use client";
import DetectionHistory from "@/components/DetectionHistory";
import DynamicIconMapping from "@/components/DynamicIconMapping";
import { cameraAtom } from "@/hooks/useSocketEvents";
import { useAtomValue } from "jotai";
import React from "react";
import moment from "moment-timezone";
import SingleRtsp from "@/components/SingleRtsp";

const currentDate = moment.tz(moment(), moment.tz.guess()).format("YYYY-MM-DD");
console.log(currentDate);

const page = () => {
  const cameraAtomVal = useAtomValue(cameraAtom);
  const [cameraData, setCameraData] = React.useState(null);

  console.log("cameraAtomVal", cameraAtomVal);

  return (
    <div className="text-3xl mt-5 font-bold text-center container">
      <div className="flex flex-col items-center justify-center">
        <DynamicIconMapping setCameraData={setCameraData} cameraData={cameraData} />
        {cameraData && <SingleRtsp id={cameraData?.id} />}
        {cameraData && <DetectionHistory cameraId={cameraData?.id} date={currentDate} />}
      </div>
    </div>
  );
};

export default page;
