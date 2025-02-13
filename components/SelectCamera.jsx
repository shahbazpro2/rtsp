import { listCamerasApi } from '@/apis/camera';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect } from 'react';
import { useApi } from 'use-hook-api';
import { cameraAtom } from "@/hooks/useSocketEvents";
import { useAtomValue } from "jotai";
import { Label } from "@/components/ui/label";

const SelectCamera = ({ setCamera, camera, isApi }) => {
    const cameraAtomVal = useAtomValue(cameraAtom);
    const [callApi, { data, loading: camerasLoading }] = useApi({})

    useEffect(() => {
        if (isApi) {
            callApi(listCamerasApi())
        }
    }, [isApi])

    const camerasList = !isApi ? Object.keys(cameraAtomVal || {}) : data?.new_cameras

    return (
        <div>
            {
                !camerasLoading && !camerasList?.length ? <Label>
                    {
                        isApi ? "No new cameras available" : "No cameras available"
                    }
                </Label> :
                    <Select onValueChange={(val) => setCamera(val)}>
                        <SelectTrigger className="w-[350px] mt-3">
                            <SelectValue placeholder="Select a Camera" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {camerasList?.map((camera) => (
                                    <SelectItem key={camera} value={camera}>
                                        {camera}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            }
        </div>
    )
}

export default SelectCamera
