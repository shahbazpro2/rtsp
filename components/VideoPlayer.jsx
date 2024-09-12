'use client'
import { blinkCameraAtom, cameraAtom } from "@/hooks/useSocketEvents";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import SingleCameraBox from "./SingleCameraBox";
import Loader from "./ui/Loader";
const ffmpegIP = "localhost";

const getGridCols = (cameraCount) => {
    if (cameraCount === 1) return "grid-cols-1";
    if (cameraCount === 2) return "grid-cols-2";
    if (cameraCount <= 4) return "grid-cols-2";
    if (cameraCount <= 6) return "grid-cols-3";
    if (cameraCount <= 9) return "grid-cols-3";
    if (cameraCount >= 12) return "grid-cols-5";
    return "grid-cols-4";
};

const getGridLayout = (cameraCount) => {
    if (cameraCount === 1) return { cols: 1, rows: 1 };
    if (cameraCount === 2) return { cols: 2, rows: 1 };
    if (cameraCount <= 4) return { cols: 2, rows: Math.ceil(cameraCount / 2) };
    if (cameraCount <= 6) return { cols: 3, rows: Math.ceil(cameraCount / 3) };
    if (cameraCount <= 9) return { cols: 3, rows: Math.ceil(cameraCount / 3) };
    if (cameraCount >= 12) return { cols: 5, rows: Math.ceil(cameraCount / 5) };
    return { cols: 4, rows: Math.ceil(cameraCount / 4) };
};

function getGridColsClass(numberSources) {
    const tilerRows = Math.floor(Math.sqrt(numberSources));
    const tilerColumns = Math.ceil(numberSources / tilerRows);

    return `grid-cols-${tilerColumns}`;
}

const VideoPlayer = () => {
    const cameras = useAtomValue(cameraAtom);
    const blinkCamera = useAtomValue(blinkCameraAtom);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        if (!cameras || Object.keys(cameras).length === 0) {
            fetch("http://localhost:8000/stream")
                .then((response) => response.json())
                .then((data) => console.log('Stream started:', data.message))
                .catch((error) => console.error("Error starting stream:", error));
        }

        const videoUrl = `ws://${ffmpegIP}:6789/`;
        const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
            autoplay: true,
        });
        const interval = setInterval(() => {
            if (player?.player?.currentTime > 0) {
                setLoading(false); // Hide loader when the video starts playing
                clearInterval(interval); // Stop polling
            }
        }, 500); // Poll every 500ms

        return () => {
            clearInterval(interval);
        }

    }, [cameras]);

    const cameraCount = Object.keys(cameras || {}).length;
    const tilerRows = Math.floor(Math.sqrt(cameraCount));
    const tilerColumns = Math.ceil(cameraCount / tilerRows);
    const gridColsClass = getGridColsClass(tilerColumns);
    const parentHeight = 565;
    const boxHeight = parentHeight / tilerRows;

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
                    {/* Show Loader if the video is loading */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[20000]">
                            <Loader />
                        </div>
                    )}
                    <div id="video-canvas" style={{ height: 565, width: 1000 }}></div>
                    <div className={`grid absolute top-0 w-full h-full z-[10000] ${gridColsClass}`}>
                        {Object.entries(cameras || {}).map(([key, _], index) => (
                            <SingleCameraBox
                                data={key}
                                key={index}
                                isBlinking={blinkCamera?.[key] && !loading}
                                boxHeight={boxHeight}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
