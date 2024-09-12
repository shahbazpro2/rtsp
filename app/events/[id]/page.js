"use client";
import DetectionHistory from "@/components/DetectionHistory";
import SingleRtsp from "@/components/SingleRtsp";
import { useParams } from "next/navigation";
import "react-medium-image-zoom/dist/styles.css";
import moment from "moment-timezone";

const currentDate = moment.tz(moment(), moment.tz.guess()).format("YYYY-MM-DD");
console.log(currentDate);

const page = () => {
  const params = useParams();

  return (
    <>
      <div className="flex justify-center items-center mt-7">
        <div className="relative" id="container">
          <SingleRtsp id={params?.id} />
          <DetectionHistory cameraId={params.id} date={currentDate} />
        </div>
      </div>
    </>
  );
};

export default page;
