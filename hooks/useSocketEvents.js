import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { io } from "socket.io-client";

const cameraAtom = atom(null);
const blinkCameraAtom = atom(null);

const useSocketEvents = () => {
  const setCameraAtom = useSetAtom(cameraAtom);
  const setBlinkCameraAtom = useSetAtom(blinkCameraAtom);
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
      for (const camera in val) {
        if (val[camera]) {
          setBlinkCameraAtom(camera);
          break;
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export { cameraAtom, blinkCameraAtom, useSocketEvents };
