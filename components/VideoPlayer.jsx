'use client'
import React, { useEffect, useState } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import SingleCameraBox from "./SingleCameraBox";
import { io } from "socket.io-client";
const ffmpegIP = "localhost";

const randomIndex = Math.floor(Math.random() * 16);

const VideoPlayer = () => {
    const [cameras, setCameras] = useState(null);
    const [nvrCameras, setNvrCameras] = useState(null)
    useEffect(() => {
        /*  fetch("/api/stream")
             .then((response) => response.json())
             .then((data) => console.log(data.message))
             .catch((error) => console.error("Error starting stream:", error));
         const videoUrl = `ws://${ffmpegIP}:6789/`;
         const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
             autoplay: true,
         });
         console.log(player); */
    }, []);

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io();
        socket.on('connect', () => {
            console.log('Connected to server');
        })

        // Listen for 'camera-status' messages
        socket.on("Camera-Status", (val) => {
            console.log('socket', val);
            setCameras(val);
        });

        socket.on('NVR-Alert', (val) => {
            setNvrCameras(val)
        })

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    console.log('cameras', cameras)


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
                    {/*  <div id="video-canvas" style={{ height: 600, width: 1300 }}></div> */}
                    <video controls autoPlay style={{ height: 565, width: 1000 }}>
                        <source src="/video.mp4" type="video/mp4" />
                    </video>
                    <div className="grid grid-cols-4 absolute top-0 w-full h-full">
                        {
                            Object.entries(cameras || {}).map(([key, _], index) => (
                                <SingleCameraBox data={key} key={index} isBlinking={nvrCameras?.[key]} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VideoPlayer;
