"use client";
import DetectionHistory from "@/components/DetectionHistory";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAtomValue } from "jotai";
import { cameraAtom } from "@/hooks/useSocketEvents";
import moment from "moment";

const page = () => {
  const cameraAtomVal = useAtomValue(cameraAtom);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [value, onChange] = useState(new Date());
  console.log("vallll", value, selectedCamera);
  return (
    <div className="mt-5 font-bold text-center container">
      <div className="grid grid-cols-3 gap-5">
        <div>
          <div className="mb-10">
            <Select onValueChange={(val) => setSelectedCamera(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(cameraAtomVal || {})?.map((camera) => (
                    <SelectItem value={camera}>{camera}</SelectItem>
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

export default page;
