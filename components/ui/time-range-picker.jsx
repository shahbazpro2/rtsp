import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

const generateTimeOptions = () => {
    const times = [];
    for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
            const hour = hours.toString().padStart(2, "0");
            const minute = minutes.toString().padStart(2, "0");
            times.push(`${hour}:${minute}`);
        }
    }
    return times;
};

export function TimeRangePicker({
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
}) {
    const timeOptions = generateTimeOptions();

    return (
        <div className="grid grid-cols-2 gap-1">
            <div className="flex flex-col gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Select value={startTime} onValueChange={onStartTimeChange}>
                    <SelectTrigger id="start-time">
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                                {time}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Select value={endTime} onValueChange={onEndTimeChange}>
                    <SelectTrigger id="end-time">
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeOptions.map((time) => (
                            <SelectItem
                                key={time}
                                value={time}
                                disabled={time <= startTime}
                            >
                                {time}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}