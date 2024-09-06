import { Camera, Trash, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { BasicModal } from './BasicModal';
import { Button } from './ui/button';
import { useApi } from 'use-hook-api';
import { addCameraApi, deleteCameraApi, getCameraCoordinatesApi } from '@/apis/camera';
import { Input } from './ui/input';
import Loader from './ui/Loader';

const AddCamera = ({ popupOpen, setPopupOpen }) => {
    const [postApi, { loading }] = useApi({ both: true })
    const [, { refetch }] = useApi({ cache: 'cameras' })
    const [cameraInput, setCameraInput] = useState('')
    console.log('popupOpen', popupOpen)
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
                <div className="text-lg">Camera ID</div>
                <Input value={cameraInput} onChange={e => setCameraInput(e.target.value)} />
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
    const [popupOpen, setPopupOpen] = useState(null);
    const [delKey, setDelKey] = useState(null);




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

        setCameraData(data)
    }

    return (
        <>
            <div
                className="relative w-[700px] h-[500px] border border-gray-300"
                onClick={handleDivClick}
                style={{ cursor: 'crosshair', backgroundImage: 'url("/map1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {
                    loading &&
                    <div className='absoulte flex justify-center items-center w-full h-full'>
                        <Loader />
                    </div>
                }
                {Object.entries(data || {})?.map(([key, val], index) => (
                    <div
                        key={index}
                        className="absolute cursor-pointer"
                        style={{
                            left: `${val?.[0]}px`,
                            top: `${val?.[1]}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        onClick={onOpenDetail}
                    >
                        <Camera className='text-white fill-blue-500 size-10' onClick={() => onSetCameraData({
                            id: key,
                            x: val?.[0],
                            y: val?.[1]
                        })} />
                        <div className='absolute -mt-11 ml-6' >
                            <Trash2 className='fill-red-500 size-5' onClick={() => setDelKey(key)} />
                        </div>
                    </div>
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



