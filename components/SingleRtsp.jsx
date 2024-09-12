import JSMpeg from '@cycjimmy/jsmpeg-player';
import React, { useEffect } from 'react'

const SingleRtsp = ({ id }) => {

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8000/stream/${id}`)
            .then((response) => response.json())
            .then((data) => console.log("ddd", data.message))
            .catch((error) => console.error("Error starting stream:", error));
        const videoUrl = `ws://localhost:6790/`;
        const player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
            autoplay: true,
        });
        console.log(player);
    }, [id]);

    return (
        <div>
            <div id="video-canvas" style={{ height: 565, width: 1000 }}></div>
        </div>
    )
}

export default SingleRtsp
