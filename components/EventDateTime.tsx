"use client"
import { DatePicker, Metric } from "@tremor/react";
import TimeInput from "./TimeInput";
import { useState } from "react";
import { addDays, addMinutes, differenceInMinutes, format } from "date-fns";

export default function EventDateTime() {
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState<string>(format(startDate, "HH:mm"));
    const [endTime, setEndTime] = useState<string>(format(addMinutes(startDate, 5), "HH:mm"));

    const calculateTimeSpent = () => {
        const startSplit = startTime.split(':');
        const endSplit = endTime.split(':');
        const startDateTime = new Date(startDate.getTime());;
        startDateTime.setHours(parseInt(startSplit[0]), parseInt(startSplit[1]), 0, 0);
        let endDateTime = new Date(startDate.getTime());;
        endDateTime.setHours(parseInt(endSplit[0]), parseInt(endSplit[1]), 0, 0);

        if(endDateTime < startDateTime){
            endDateTime = addDays(endDateTime, 1);
        }

        return differenceInMinutes(endDateTime, startDateTime);
    }

    return (
        <>
            <Metric>Start Date</Metric>
            <DatePicker value={startDate} onValueChange={(value) => setStartDate(value)} />
            <Metric>Start Time:</Metric>
            <TimeInput value={startTime} onValueChange={(value) => setStartTime(value)} />
            <Metric>End Time:</Metric>
            <TimeInput value={endTime} onValueChange={(value) => setEndTime(value)} />
            {calculateTimeSpent()}
        </>
    );
}
