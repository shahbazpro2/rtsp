import { TimeRangePicker } from '@/components/ui/time-range-picker';
import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SelectCamera from '@/components/SelectCamera';
import { useSelectAtom } from '../../../../app/settings/page';

const CameraConfiguration = () => {
    const [values, _, setValues] = useSelectAtom(['startTime', 'endTime', 'mute', 'tts', 'selectedCamera']);
    console.log('values22', values)

    return <div className='my-5'>
        <Label>Mute</Label>
        <div className="flex items-center space-x-2 mt-2">
            <Switch onCheckedChange={(val) => setValues(['mute', val])} />
        </div>
    </div>

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
            />
            <div className="flex gap-5">
                <div className='my-5'>
                    <Label>Mute</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Switch checked={mute} onCheckedChange={(val) => setMute(val)} />
                    </div>
                </div>
                <div className='my-5'>
                    <Label>TTS</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Switch checked={tts} onCheckedChange={(val) => setTts(val)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraConfiguration
