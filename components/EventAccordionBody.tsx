"use client"
import { Button } from "@tremor/react";
import { formatInTimeZone } from "date-fns-tz";


type EventAccordionBodyProps = {
    eventId: number,
    startTime: Date,
    endTime: Date,
    timezone: string,
    intensity: number,
    updateEvent: (id: number) => void,
    deleteEvent: (id: number) => void,
}
export function EventAccordionBody(props: EventAccordionBodyProps) {
    return <div>
        <p>Start Time - {formatDateWithTimezone(props.startTime, props.timezone)}</p>
        <p>End Time - {formatDateWithTimezone(props.endTime, props.timezone)}</p>
        <p>Intensity - {props.intensity}</p>
        <div className="flex justify-center gap-3">
            <Button onClick={() => props.updateEvent(props.eventId)} size="sm" variant="secondary">Edit</Button>
            <Button onClick={() => props.deleteEvent(props.eventId)} size="sm" color="red" variant="secondary" >Delete</Button>
        </div>
    </div>

}

const formatDateWithTimezone = (d: Date, tz: string) => {
    return formatInTimeZone(d, tz, 'yyyy-mm-dd HH:mm:ss zzz')

}
