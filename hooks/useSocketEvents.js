import { socket } from "@/lib/socket";
import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import useUserSettings from "./useUserSettings";
import useSound from "use-sound";

const cameraAtom = atom(null);
const blinkCameraAtom = atom(null);
const wallboardStreamAtom = atom(null);

const useSocketEvents = () => {
  const setCameraAtom = useSetAtom(cameraAtom);
  const [blinkCamera, setBlinkCameraAtom] = useAtom(blinkCameraAtom);
  const setWallboardStreamAtom = useSetAtom(wallboardStreamAtom);

  const settingData = useUserSettings();
  const [carPlay] = useSound("/car.mp3");
  const [personPlay] = useSound("/person.mp3");
  const [carPersonPlay] = useSound("/car-person.mp3");

  const isWithinTimestamp = (timestampRanges) => {
    if (!timestampRanges || timestampRanges.length === 0) return true; // No restriction

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

    const [start, end] = timestampRanges.map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    });
    console.log("ccc", currentTime, start, end);
    return currentTime >= start && currentTime <= end;
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      console.warn("Speech Synthesis API is not supported.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Adjust speed (0.1 to 10)
    utterance.pitch = 1; // Adjust pitch (0 to 2)
    utterance.volume = 1; // Volume (0 to 1)

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (settingData?.loading) return;

    Object.entries(blinkCamera || {}).forEach(([camera, objects]) => {
      const cameraSettings = settingData?.data?.audio_settings?.[camera] || {};
      const ttsEnabled = cameraSettings.tts;
      const isMuted = cameraSettings.mute;
      const timestamps = cameraSettings.timestamp;

      if (isMuted || !isWithinTimestamp(timestamps)) return;

      let isCar = objects.includes("Car");
      let isPerson = objects.includes("Person");
      let isBoth = isCar && isPerson;

      if (ttsEnabled) {
        objects.forEach((obj, i) => {
          speakText(`${camera} detected ${obj}`);
        });
      } else {
        if (isBoth) {
          carPersonPlay();
        } else if (isCar) {
          carPlay();
        } else if (isPerson) {
          personPlay();
        }
      }
    });
  }, [blinkCamera, settingData]);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.emit("initialData", null);

    socket.on("initialCamera", (val) => {
      console.log("initialcamera", val);
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

    socket.on("Camera-Status", (val) => {
      console.log("cammsta", val);
      window.location.reload();
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
