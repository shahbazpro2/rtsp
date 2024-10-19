"use client";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useApi } from "use-hook-api";
import { getUserSettings, postUserSettings } from "../../apis/settings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Setting = () => {
  const [path, setPath] = useState('')
  const [audio, setAudio] = useState(false)
  const [, { loading }] = useApi({}, getUserSettings(), ({ data }) => {
    setPath(data.frames_path)
    setAudio(data.audio === 'on')
  })
  const [callApi, { data, loading: postLoading }] = useApi({ both: true, resSuccessMsg: 'Settings saved successfully' });

  const onSave = () => {
    const formData = new FormData();
    formData.append('frames_path', path);
    formData.append('audio', audio ? 'on' : 'off');
    callApi(postUserSettings(formData))
  }

  return (
    <div className="mt-5 font-bold container">
      <div className="max-w-2xl">
        <div className="font-bold">Storage Path</div>
        <Input type="text" className="mt-2" value={path} onChange={e => setPath(e.target.value)} />
        <div className="mt-5 font-bold">Audio</div>
        <div className="flex items-center space-x-2 mt-2">
          <Switch checked={audio} onCheckedChange={val => setAudio(val)} />
        </div>
        <Button disabled={loading || postLoading} className="mt-5" onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default Setting;
