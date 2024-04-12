"use client"
import { Metric, ProgressBar } from "@tremor/react";
import TimeInput from "./TimeInput";

export default function CreateEvent() {
    return (
        <>
            <ProgressBar value={72} />
            <Metric>Start Time:</Metric>
            <TimeInput/>
            <Metric>End Time:</Metric>
        </>
    );
}
