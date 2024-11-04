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

  const settingData = useUserSettings()
  const [carPlay] = useSound('/car.mp3')
  const [personPlay] = useSound('/person.mp3')
  const [carPersonPlay] = useSound('/car-person.mp3')

  useEffect(() => {
    if (settingData?.loading || settingData?.data?.audio !== 'on') return
    const resData = Object.values(blinkCamera || {}).reduce((acc, curr) => {
      if (curr.includes('Car') && curr.includes('Person')) {
        return { isCar: false, isPerson: false, isBoth: true }
      } else if (curr.includes('Car')) {
        return { isCar: true, isPerson: false, isBoth: false }
      } else if (curr.includes('Person')) {
        return { isCar: false, isPerson: true, isBoth: false }
      }
    }, { isCar: false, isPerson: false, isBoth: false })
    const { isCar, isPerson, isBoth } = resData || {}
    if (isBoth) {
      carPersonPlay()
    } else if (isCar) {
      carPlay()
    } else if (isPerson) {
      personPlay()
    }

  }, [blinkCamera, settingData])

  useEffect(() => {
    socket.on("connect", () => { });

    socket.emit("initialData", null);

    socket.on('initialCamera', (val) => {
      console.log('initialcamera', val)
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
    })

    socket.on("Camera-Status", (val) => {
      console.log('cammsta', val)
      window.location.reload()
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
