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
    console.log("inside useSocket");
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("initialData", null);

    socket.on("Camera-Status", (val) => {
      console.log("Camera-Status", val);
      setCameraAtom(val);
    });

    socket.on("NVR-Alert", (val) => {
      console.log("NVR-Alert", val);
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
      //console.log("stream", data);
      setWallboardStreamAtom(data);
    });

    /*  return () => {
      socket.disconnect();
    }; */
  }, [socket]);
};

export { cameraAtom, blinkCameraAtom, useSocketEvents, wallboardStreamAtom };
