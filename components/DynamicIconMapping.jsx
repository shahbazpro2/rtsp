import { addCameraApi, deleteCameraApi, getCameraCoordinatesApi, listCamerasApi } from '@/apis/camera';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { blinkCameraAtom } from '@/hooks/useSocketEvents';
import { useAtomValue } from 'jotai';
import { Camera, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApi } from 'use-hook-api';
import { BasicModal } from './BasicModal';
import Loader from './ui/Loader';
import { Button } from './ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddCamera = ({ popupOpen, setPopupOpen }) => {
    const [postApi, { loading }] = useApi({ both: true })
    const [, { refetch }] = useApi({ cache: 'cameras' })
    const [cameraInput, setCameraInput] = useState('')
    const [callApi,{data,loading:camerasLoading}]=useApi({})

    useEffect(()=>{
        if(popupOpen){
            callApi(listCamerasApi())
        }
    },[popupOpen])

    const handleConfirm = () => {
        const formData = new FormData()
        formData.append('x', popupOpen.x)
        formData.append('y', popupOpen.y)
        formData.append('camera_id', cameraInput)

        postApi(addCameraApi(formData), () => {
            refetch()
            setPopupOpen(null);
        })

    };

    const handleCancel = () => {
        setPopupOpen(null);
    };

    return (
        <BasicModal open={true} onClose={handleCancel}>
            <div className="p-4">
                <h3 className="text-lg font-semibold">Add Icon</h3>
                <p>Do you want to add an icon here?</p>
            {
            !loading && !data?.new_cameras?.length ? <div>
                No new cameras available
            </div>:
                <Select onValueChange={(val) => setCameraInput(val)}>
              <SelectTrigger className="w-[350px] mt-3">
                <SelectValue placeholder="Select a Camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {data?.new_cameras?.map((camera) => (
                    <SelectItem key={camera} value={camera}>
                      {camera}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            }
                <div className="mt-4 flex justify-end">
                    <Button disabled={loading || !cameraInput} onClick={handleConfirm} className="mr-2">Confirm</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </BasicModal>
    )
}

const DeleteCamera = ({ delKey, setDelKey }) => {
    const [postApi, { loading }] = useApi({ both: true })
    const [, { refetch }] = useApi({ cache: 'cameras' })

    const handleConfirm = () => {
        const formData = new FormData()
        formData.append('camera_id', delKey)

        postApi(deleteCameraApi(formData), () => {
            refetch()
            setDelKey(null);
        })
    };

    const handleCancel = () => {
        setDelKey(null);
    };

    return (
        <BasicModal open={true} onClose={handleCancel}>
            <div className="p-4">
                <h3 className="text-lg font-semibold">Delete Icon</h3>
                <p>Do you want to delete this icon?</p>
                <div className="mt-4 flex justify-end">
                    <Button disabled={loading} onClick={handleConfirm} className="mr-2">Confirm</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </BasicModal>
    )
}


const DynamicIconMappingWithImage = ({ setCameraData, cameraData }) => {
    const [, { data, loading }] = useApi({ cache: 'cameras' }, getCameraCoordinatesApi())
    const blinkCamera = useAtomValue(blinkCameraAtom);
    const [popupOpen, setPopupOpen] = useState(null);
    const [delKey, setDelKey] = useState(null);
    const params = useParams()
    const router = useRouter()

    const handleDivClick = (event) => {
        const div = event.target.getBoundingClientRect();
        const x = event.clientX - div.left;
        const y = event.clientY - div.top;

        setPopupOpen({ x, y });
    };

    const onOpenDetail = (e) => {
        e.stopPropagation();
    }

    const onSetCameraData = (data) => {
        if (cameraData?.id === data.id) {
            return setCameraData(null)
        }

        if (params?.id) {
            router.push(`/events/${data?.id}`)
        }


        setCameraData(data)
    }

    const onDelCamera = (e, key) => {
        e.stopPropagation()
        setDelKey(key)
    }

    return (
        <>
            <div
                className="relative w-[1000px] h-[500px] border border-gray-300"
                onClick={handleDivClick}
                style={{ cursor: 'crosshair', backgroundImage: 'url("/Map_v6.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {
                    loading &&
                    <div className='absoulte flex justify-center items-center w-full h-full'>
                        <Loader />
                    </div>
                }
                {Object.entries(data || {})?.map(([key, val], index) => (
                    <TooltipProvider key={index}>
                        <Tooltip delayDuration={100} >
                            <div

                                className="absolute cursor-pointer -z-0 text-white"
                                style={{
                                    left: `${val?.[0]}px`,
                                    top: `${val?.[1]}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                                onClick={onOpenDetail}
                            >
                                <div className='relative'>

                                    <TooltipTrigger asChild>
                                        <Camera className={`text-white ${blinkCamera?.[key] ? 'fill-green-400 animate-blink' : 'fill-blue-500'}  size-10`} onClick={() => onSetCameraData({
                                            id: key,
                                            x: val?.[0],
                                            y: val?.[1]
                                        })} />

                                    </TooltipTrigger>


                                    <div className="absolute -top-2 -left-2 text-xs w-[70px] font-bold">
                                        {key}
                                    </div>
                                </div>
                            </div>
                            <TooltipContent className="z-50 cursor-default" onClick={e => e.stopPropagation()}>
                                <div className='absolute bottom-1 right-1 ml-6' >
                                    <Trash2 className='fill-red-500 size-5 cursor-pointer' onClick={(e) => onDelCamera(e, key)} />
                                </div>
                                <div className='p-2 text-base grid grid-cols-2 text-left gap-1'>
                                    <div >Camera ID:</div> <div className='text-lg ml-2 font-bold'>{key}</div>
                                    <div>Coordinates:</div>  <div className='text-lg ml-2 font-bold'>{val?.[0]}, {val?.[1]}</div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
            {popupOpen && (
                <AddCamera popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
            )}
            {
                delKey && (
                    <DeleteCamera delKey={delKey} setDelKey={setDelKey} />
                )
            }
        </>
    );
};

export default DynamicIconMappingWithImage;



