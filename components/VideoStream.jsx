import { wallboardStreamAtom } from '@/hooks/useSocketEvents';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
    const videoRef = useRef(null);
    const wallboardStreamVal = useAtomValue(wallboardStreamAtom)

    useEffect(() => {
        if (!wallboardStreamVal) return


        const arrayBuffer = wallboardStreamVal;
        const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);

        if (videoRef.current) {
            videoRef.current.src = videoUrl;
            videoRef.current.play();
        }



    }, [wallboardStreamVal]);

    return (
        <div>
            <video
                ref={videoRef}
                controls
                autoPlay
                style={{ width: '100%', height: 'auto' }}
            ></video>
        </div>
    );
};

export default VideoStream;
