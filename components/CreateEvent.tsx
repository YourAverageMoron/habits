import { Metric, ProgressBar } from "@tremor/react";

export default function CreateEvent() {
    return (
        <>
            <ProgressBar value={72} />
            <Metric>Start Time:</Metric>
            <Metric>End Time:</Metric>
        </>
    );
}
