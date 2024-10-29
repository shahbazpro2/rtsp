'use client'
import { blinkCameraAtom, cameraAtom } from "@/hooks/useSocketEvents";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import SingleCameraBox from "./SingleCameraBox";
import Loader from "./ui/Loader";
import useSound from 'use-sound';
import useUserSettings from "@/hooks/useUserSettings";


const VideoPlayer = () => {
    const cameras = useAtomValue(cameraAtom);
    const blinkCamera = useAtomValue(blinkCameraAtom);
    const [loading, setLoading] = useState(true);
    const settingData = useUserSettings()
    const [carPlay] = useSound('/car.mp3')
    const [personPlay] = useSound('/person.mp3')
    const [carPersonPlay] = useSound('/car-person.mp3')

    useEffect(() => {
        if (settingData?.loading || settingData?.audio !== 'on') return
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
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream`)
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((error) => console.error("Error starting stream:", error));

        const videoUrl = `ws://localhost:6789/`;
        const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
            autoplay: true,
        });
        const interval = setInterval(() => {
            if (player?.player?.currentTime > 0) {
                setLoading(false);
                clearInterval(interval);
            }
        }, 500);

        window.addEventListener("beforeunload", (event) => {
            console.log('call')
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream?stop=true`)
        });

        return () => {
            try {
                player?.destroy()
            } catch (err) {
                // window.location.replace(`/`)
                console.log("err11", err)
            }
            clearInterval(interval);
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream?stop=true`)
        }

    }, []);



    const cameraCount = Object.keys(cameras || {}).length;
    const tilerRows = Math.floor(Math.sqrt(cameraCount));
    const tilerColumns = Math.ceil(cameraCount / tilerRows);
    const parentHeight = 565;
    const boxHeight = parentHeight / tilerRows;

    return (
        <div id="body">

            <div
                id="title"
                className="flex justify-center items-center text-3xl font-bold mt-10 mb-2.5 text-primary"
            >
                Summit Ridge Camera Wall
            </div>
            <div className="flex justify-center items-center mt-7">
                <div className="relative">
                    {/* Show Loader if the video is loading */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[20000]">
                            <Loader />
                        </div>
                    )}
                    <div id="video-canvas" style={{ height: 565, width: 1460 }}></div>
                    <div className={`grid absolute top-0 w-full h-full z-[10000]`} style={{ gridTemplateColumns: `repeat(${tilerColumns}, minmax(0, 1fr))` }}>

                        {Object.entries(cameras || {}).map(([key, _], index) => (
                            <div key={index} className="relative">
                                <SingleCameraBox
                                    data={key}
                                    isBlinking={blinkCamera?.[key]?.length > 0 && !loading}
                                    boxHeight={boxHeight}
                                />
                                <div className="absolute bottom-0 right-0 z-50 text-white text-xs font-bold bg-black/50 px-2 rounded">
                                    {key}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
