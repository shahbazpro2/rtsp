import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { io } from "socket.io-client";

const cameraAtom = atom(null);
const blinkCameraAtom = atom(null);
const wallboardStreamAtom = atom(null);

const useSocketEvents = () => {
  const setCameraAtom = useSetAtom(cameraAtom);
  const setBlinkCameraAtom = useSetAtom(blinkCameraAtom);
  const setWallboardStreamAtom = useSetAtom(wallboardStreamAtom);
  useEffect(() => {
    const socket = io();
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("Camera-Status", (val) => {
      console.log("socket", val);
      setCameraAtom(val);
    });

    socket.on("NVR-Alert", (val) => {
      console.log("val", val);
      for (const camera in val) {
        if (val[camera]) {
          setBlinkCameraAtom(camera);
          break;
        }
      }
    });

    socket.on("stream", (data) => {
      console.log("stream", data);
      setWallboardStreamAtom(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export { cameraAtom, blinkCameraAtom, useSocketEvents, wallboardStreamAtom };
