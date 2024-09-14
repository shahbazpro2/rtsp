import JSMpeg from '@cycjimmy/jsmpeg-player';
import React, { useEffect, useState } from 'react'
import Loader from './ui/Loader';

const SingleRtsp = ({ id }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8000/stream/${id}`)
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((error) => console.error("Error starting stream:", error));
        const videoUrl = `ws://localhost:6790/`;
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
    }, [id]);

    return (
        <div className='relative'>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[20000]">
                    <Loader />
                </div>
            )}
            <div id="video-canvas" style={{ height: 565, width: 1000 }}></div>
        </div>
    )
}

export default SingleRtsp
