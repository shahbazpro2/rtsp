import JSMpeg from '@cycjimmy/jsmpeg-player';
import React, { useEffect, useState } from 'react'
import Loader from './ui/Loader';
import { useApi } from 'use-hook-api';
import { singleStreamApi } from '@/apis/stream';
import { atom, useAtom } from 'jotai';
import {usePathname} from 'next/navigation'

export const playerAtom=atom(null)

const SingleRtsp = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useAtom(playerAtom);
    const pathname=usePathname()
    const [callApi]=useApi({})
console.log('pathname',pathname)

    const clearFun=()=>{
        console.log('call',player)
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/${id}?stop=true`)
        
        destroyFun()
        
    }


    const destroyFun=()=>{
        try{
            player?.destroy()
        }catch(err){
            if(pathname==='/historical'){
                window.location.reload()
            }else
            window.location.replace(`/events/${id}`)
            console.log("err11",err)
        }
    }

    useEffect(()=>{
        window.addEventListener("beforeunload", (event) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/${id}?stop=true`)
        });
    },[])

    useEffect(() => {
     
        if (!id) return () => {
            clearFun()
        };

        setLoading(true)
        callApi(singleStreamApi(id),null,()=>{
           destroyFun()
            setPlayer(null)
        })
      /* fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/${id}`)
          .then((response) => response.json())
          .then((data) => {

          })
          .catch((error) => console.error("Error starting stream:", error)); */
        const videoUrl = `ws://localhost:6790/`;
        const pl = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
            autoplay: true,
        });
        setPlayer(pl);
        

        return () => {
            clearFun()
        }

    }, [id]);

    useEffect(() => {
        console.log('player', player)
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
