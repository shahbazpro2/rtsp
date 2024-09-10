'use client'
import { blinkCameraAtom, cameraAtom } from "@/hooks/useSocketEvents";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import SingleCameraBox from "./SingleCameraBox";
const ffmpegIP = "localhost";

const getGridCols = (cameraCount) => {
    if (cameraCount === 1) return "grid-cols-1";
    if (cameraCount === 2) return "grid-cols-2";
    if (cameraCount <= 4) return "grid-cols-2";
    if (cameraCount <= 6) return "grid-cols-3";
    if (cameraCount <= 9) return "grid-cols-3";
    return "grid-cols-4";
};

const getGridLayout = (cameraCount) => {
    if (cameraCount === 1) return { cols: 1, rows: 1 };
    if (cameraCount === 2) return { cols: 2, rows: 1 };
    if (cameraCount <= 4) return { cols: 2, rows: Math.ceil(cameraCount / 2) };
    if (cameraCount <= 6) return { cols: 3, rows: Math.ceil(cameraCount / 3) };
    if (cameraCount <= 9) return { cols: 3, rows: Math.ceil(cameraCount / 3) };
    return { cols: 4, rows: Math.ceil(cameraCount / 4) };
};

const VideoPlayer = () => {
    const cameras = useAtomValue(cameraAtom)
    const blinkCamera = useAtomValue(blinkCameraAtom)
    useEffect(() => {
        if (!cameras || Object.keys(cameras).length === 0) {
            fetch("http://localhost:8000/stream")
                .then((response) => response.json())
                .then((data) => console.log('ddd', data.message))
                .catch((error) => console.error("Error starting stream:", error));
        }
        const videoUrl = `ws://${ffmpegIP}:6789/`;
        const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
            autoplay: true,
        });
        console.log(player);
    }, []);



    const cameraCount = Object.keys(cameras || {}).length;
    const { rows } = getGridLayout(cameraCount);
    const parentHeight = 565; // Parent container height
    const boxHeight = parentHeight / rows; // Calculate height for each box


    console.log('cameras', cameras, blinkCamera)


    return (
        <div id="body">
            <div
                id="title"
                className="flex justify-center items-center text-3xl font-bold mt-10 mb-2.5 text-primary"
            >
                Video Wallboard
            </div>
            <div className="flex justify-center items-center mt-7">
                <div className="relative">
                    <div id="video-canvas" style={{ height: 565, width: 1000 }}></div>
                    {/* <video controls autoPlay style={{ height: 565, width: 1000 }}>
                        <source src="/video.mp4" type="video/mp4" />
                    </video> */}
                    <div className={`grid absolute top-0 w-full h-full z-[10000] ${getGridCols(cameraCount)}`}>
                        {Object.entries(cameras || {}).map(([key, _], index) => (
                            <SingleCameraBox
                                data={key}
                                key={index}
                                isBlinking={blinkCamera === key}
                                boxHeight={boxHeight} // Pass the calculated height to SingleCameraBox
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VideoPlayer;
