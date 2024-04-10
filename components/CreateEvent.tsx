import { Metric, ProgressBar } from "@tremor/react";
import DateTimeInput from "./DateTimeInput";

export default function CreateEvent() {
    return (
        <>
            <ProgressBar value={72} />
            <Metric>Start Time:</Metric>
            <DateTimeInput/>
            <Metric>End Time:</Metric>
        </>
    );
}
