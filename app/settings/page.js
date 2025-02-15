"use client";
import Audio from "@/components/pages/settings/audio";
import CameraConfiguration from "@/components/pages/settings/camera";
import Storage from "@/components/pages/settings/storage";
import { Button } from "@/components/ui/button";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import "react-calendar/dist/Calendar.css";
import { useApi } from "use-hook-api";
import { getUserSettings, postUserSettings } from "../../apis/settings";
import { useJotaiAtom } from "@/hooks/useJotaiAtom";

const Heading = ({ children }) => (
  <div className="font-bold text-lg my-5 bg-gray-100 p-3 rounded text-gray-800">
    {children}
  </div>
);

const settingStateAtom = atom({
  path: "",
  audio: false,
  startTime: "",
  endTime: "",
  mute: false,
  tts: false,
});

/* export const useMultiSelectAtom = (keys) => {
  return keys.reduce((acc, key) => {
    acc[key] = useJotaiAtom(key, settingStateAtom);
    return acc;
  }, {});
}; */

export const useSelectAtom = (key) => {
  const setValue = useSetAtom(settingStateAtom);
  const value = useJotaiAtom(key, settingStateAtom);

  const setKeyValue = (newValue) => {
    setValue((prev) => ({ ...prev, [key]: newValue }));
  };

  const setAnyValue = (payload) => {
    setValue((prev) => ({ ...prev, [payload[0]]: payload[1] }));
  };

  return [value, setKeyValue, setAnyValue];
};
const Save = () => {
  const [callApi, { loading: postLoading }] = useApi({
    both: true,
    refetchApis: ["userSettings"],
    resSuccessMsg: "Settings saved successfully",
  });
  const [, { loading }] = useApi({ cache: "userSettings" });
  const settingState = useAtomValue(settingStateAtom);

  const onSave = () => {
    const { path, audio, mute, selectedCamera, tts, startTime, endTime } =
      settingState;
    const formData = new FormData();
    formData.append("frames_path", path);
    formData.append("audio", audio ? "on" : "off");
    formData.append("mute", mute ? "on" : "off");
    formData.append("camera_id", selectedCamera);
    formData.append("tts", tts);
    if (startTime && endTime) {
      formData.append("start_timestamp", startTime);
      formData.append("end_timestamp", endTime);
    }

    callApi(postUserSettings(formData));
  };

  return (
    <Button
      disabled={loading || postLoading}
      className="mt-5 w-full"
      onClick={onSave}
    >
      Save
    </Button>
  );
};

const Setting = () => {
  const setSettingState = useSetAtom(settingStateAtom);
  const [, { data }] = useApi({ cache: "userSettings" }, getUserSettings());

  useEffect(() => {
    if (data) {
      setSettingState((prev) => ({
        ...prev,
        path: data.frames_path,
        audio: data.audio === "on",
      }));
    }
  }, [data]);

  return (
    <div className="mt-7 font-bold container py-5">
      <div className="max-w-2xl mx-auto">
        <Heading>Camera Configuration</Heading>
        <CameraConfiguration />
        <Heading>Storage Configuration</Heading>
        <Storage />
        <Heading>Audio Configuration</Heading>
        <Audio />
        <Save />
      </div>
    </div>
  );
};

export default Setting;
