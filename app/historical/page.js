"use client";
import DetectionHistory from "@/components/DetectionHistory";
import SingleRtsp from "@/components/SingleRtsp";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cameraAtom } from "@/hooks/useSocketEvents";
import { useAtomValue } from "jotai";
import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Historical = () => {
  const cameraAtomVal = useAtomValue(cameraAtom);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [value, onChange] = useState(new Date());
  return (
    <div className="mt-5 font-bold text-center container">
      <div className="grid grid-cols-3 gap-5 mb-10">
        {selectedCamera && (
          <div className="col-span-3 flex justify-center">
            <SingleRtsp id={selectedCamera} />
          </div>
        )}
        <div id="container">
          <div className="mb-4">
            <Select onValueChange={(val) => setSelectedCamera(val)}>
              <SelectTrigger className="w-[350px]">
                <SelectValue placeholder="Select a Camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(cameraAtomVal || {})?.map((camera) => (
                    <SelectItem key={camera} value={camera}>
                      {camera}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Calendar onChange={onChange} value={value} activeStartDate={value} />
        </div>
        <div className="col-span-2">
          <DetectionHistory cameraId={selectedCamera} date={moment(value).format("YYYY-MM-DD")} />
        </div>
      </div>
    </div>
  );
};

export default Historical;
