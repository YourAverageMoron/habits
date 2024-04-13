"use client"
import { ProgressBar } from "@tremor/react";
import EventDateTime from "./EventDateTime";

export default function CreateEvent() {
    return <>
        <ProgressBar value={72} />
        <EventDateTime />
    </>
}

