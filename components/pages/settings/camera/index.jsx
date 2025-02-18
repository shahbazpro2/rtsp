import SelectCamera from '@/components/SelectCamera';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TimeRangePicker } from '@/components/ui/time-range-picker';
import { useSelectAtom } from '../../../../app/settings/page';
import { useApi } from 'use-hook-api';
import { useEffect } from 'react';
import { getCameraSettingsApi } from '../../../../apis/camera';

const CameraConfiguration = () => {
    const [callApi, { loading }] = useApi({})
    const [selectedCamera, setSelectedCamera] = useSelectAtom('selectedCamera')
    const [startTime, setStartTime] = useSelectAtom('startTime')
    const [endTime, setEndTime] = useSelectAtom('endTime')
    const [mute, setMute] = useSelectAtom('mute')
    const [tts, setTts] = useSelectAtom('tts')

    useEffect(() => {
        if (selectedCamera) {
            const formData = new FormData()
            formData.append('camera_id', selectedCamera)
            callApi(getCameraSettingsApi(formData), ({ data }) => {
                const dt = data?.[selectedCamera]
                const [start_timestamp, end_timestamp] = dt?.timestamp
                setStartTime(start_timestamp || '')
                setEndTime(end_timestamp || '')
                setMute(dt?.mute)
                setTts(dt?.tts)
            })
        }
    }, [selectedCamera])


    return (
        <div>
            <div className="mb-5">
                <SelectCamera setCamera={setSelectedCamera} />
            </div>
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                disabled={!selectedCamera}
            />
            <div className="flex gap-5">
                <div className='my-5'>
                    <Label>Mute</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Switch checked={mute} onCheckedChange={setMute} disabled={!selectedCamera} />
                    </div>
                </div>
                <div className='my-5'>
                    <Label>TTS</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Switch checked={tts} onCheckedChange={setTts} disabled={!selectedCamera} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraConfiguration
