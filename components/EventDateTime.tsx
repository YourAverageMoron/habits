"use client"
import { DatePicker, Metric, ProgressBar } from "@tremor/react";
import TimeInput from "./TimeInput";
import { useState } from "react";
import { addMinutes, format } from "date-fns";

export default function EventDateTime() {
    const date = new Date()

    const [startTime, setStartTime] = useState<string | undefined>(format(date, "HH:mm"));
    const [endTime, setEndTime] = useState<string | undefined>(format(addMinutes(date, 5), "HH:mm"));

    return (
        <>
            <Metric>Start Date</Metric>
            <DatePicker defaultValue={date} />
            <Metric>Start Time:</Metric>
            <TimeInput value={startTime} onValueChange={(value) => setStartTime(value)} />
            <Metric>End Time:</Metric>
            <TimeInput value={endTime} onValueChange={(value) => setEndTime(value)} />
        </>
    );
}
