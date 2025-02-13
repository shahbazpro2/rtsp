import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAtom } from 'jotai';
import React from 'react';
import { useSelectAtom } from "../../../../app/settings/page";

const Audio = () => {
    const [audio, setAudio] = useSelectAtom('audio')
    return (
        <div>
            <Label className="">Audio</Label>
            <div className="flex items-center space-x-2 mt-2">
                <Switch checked={audio} onCheckedChange={(val) => setAudio(val)} />
            </div>
        </div>
    )
}

export default Audio
