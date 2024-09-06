"use client";
import DetectionHistory from "@/components/DetectionHistory";
import DynamicIconMapping from "@/components/DynamicIconMapping";
import { cameraAtom } from "@/hooks/useSocketEvents";
import { useAtomValue } from "jotai";
import React from "react";

const page = () => {
  const cameraAtomVal = useAtomValue(cameraAtom);
  const [cameraData, setCameraData] = React.useState(null);
  const currentDate = new Date().toISOString().split("T")[0];

  console.log("cameraAtomVal", cameraAtomVal);

  return (
    <div className="text-3xl mt-5 font-bold text-center container">
      <div className="flex flex-col items-center justify-center">
        <DynamicIconMapping setCameraData={setCameraData} cameraData={cameraData} />
        {cameraData && <DetectionHistory cameraId={cameraData?.id} date={currentDate} />}
      </div>
    </div>
  );
};

export default page;
