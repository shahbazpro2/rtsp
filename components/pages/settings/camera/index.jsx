import SelectCamera from '@/components/SelectCamera';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TimeRangePicker } from '@/components/ui/time-range-picker';
import { useSelectAtom } from '../../../../app/settings/page';

const CameraConfiguration = () => {
    const [selectedCamera, setSelectedCamera] = useSelectAtom('selectedCamera')
    const [startTime, setStartTime] = useSelectAtom('startTime')
    const [endTime, setEndTime] = useSelectAtom('endTime')
    const [mute, setMute] = useSelectAtom('mute')
    const [tts, setTts] = useSelectAtom('tts')


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
