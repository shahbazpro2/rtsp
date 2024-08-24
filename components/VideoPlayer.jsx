'use client'
import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

const ffmpegIP = "localhost";

const VideoPlayer = () => {
    useEffect(() => {
        fetch("/api/stream")
            .then((response) => response.json())
            .then((data) => console.log(data.message))
            .catch((error) => console.error("Error starting stream:", error));
        const videoUrl = `ws://${ffmpegIP}:6789/`;
        const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
            autoplay: true,
        });
        console.log(player);
    }, []);

    return (
        <div id="body">
            <div
                id="title"
                className="flex justify-center items-center text-3xl font-bold mt-10 mb-2.5 text-primary"
            >
                Video Wallboard
            </div>
            <div className="flex justify-center items-center mt-7">
                <div className="">
                    <div id="video-canvas" style={{ height: 600, width: 1300 }}></div>
                </div>

            </div>
        </div>
    );
};

export default VideoPlayer;
