import JSMpeg from '@cycjimmy/jsmpeg-player';
import React, { useEffect, useState } from 'react'
import Loader from './ui/Loader';

const SingleRtsp = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);

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
        setPlayer(player);

    }, [id]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (player?.player?.startTime > 0) {
                setLoading(false);
                clearInterval(interval);
            }
        }, 500);

        return () => {
            clearInterval(interval);
        }
    }, [player]);

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
