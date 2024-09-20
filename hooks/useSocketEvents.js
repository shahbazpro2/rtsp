import { socket } from "@/lib/socket";
import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";

const cameraAtom = atom(null);
const blinkCameraAtom = atom(null);
const wallboardStreamAtom = atom(null);

const useSocketEvents = () => {
  const setCameraAtom = useSetAtom(cameraAtom);
  const setBlinkCameraAtom = useSetAtom(blinkCameraAtom);
  const setWallboardStreamAtom = useSetAtom(wallboardStreamAtom);
  useEffect(() => {
    socket.on("connect", () => {});

    socket.emit("initialData", null);

    socket.on("Camera-Status", (val) => {
      //sort the cameras by name like Camera 1, Camera 2, Camera 3
      const sortedCameras = Object.keys(val)
        .sort((a, b) => {
          const aNum = parseInt(a.split(" ")[1]);
          const bNum = parseInt(b.split(" ")[1]);
          return aNum - bNum;
        })
        .reduce((acc, key) => {
          acc[key] = val[key];
          return acc;
        }, {});
      setCameraAtom(sortedCameras);
    });

    socket.on("NVR-Alert", (val) => {
      setBlinkCameraAtom(val);
      // setCameraAtom(val);
      /*   for (const camera in val) {
        if (val[camera]) {
          setBlinkCameraAtom(camera);
          break;
        }
      } */
    });

    socket.on("stream", (data) => {
      setWallboardStreamAtom(data);
    });

    /*  return () => {
      socket.disconnect();
    }; */
  }, [socket]);
};

export { cameraAtom, blinkCameraAtom, useSocketEvents, wallboardStreamAtom };
