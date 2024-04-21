"use client"
import { Callout, DatePicker, NumberInput } from "@tremor/react";
import { TimeInput } from "./TimeInput";
import { addDays, differenceInMinutes, format } from "date-fns";
import { RiCalendarScheduleLine, RiInformationLine } from "@remixicon/react";


type EventDateTimeAndIntensityProps = {
    startDate: Date,
    onStartDateChange: (value: Date) => void;
    startTime: string;
    onStartTimeChange: (value: string) => void;
    endTime: string;
    onEndTimeChange: (value: string) => void;
    intensity: number;
    onIntensityChange: (value: number) => void;
}

export default function EventDateTimeAndIntensity(props: EventDateTimeAndIntensityProps) {
    const calculateInfoBox = () => {
        try {
            const startSplit = props.startTime.split(':');
            const endSplit = props.endTime.split(':');
            const startDateTime = new Date(props.startDate.getTime());;
            startDateTime.setHours(Number(startSplit[0]), Number(startSplit[1]), 0, 0);
            let endDateTime = new Date(props.startDate.getTime());;
            endDateTime.setHours(Number(endSplit[0]), Number(endSplit[1]), 0, 0);

            if (endDateTime < startDateTime) {
                endDateTime = addDays(endDateTime, 1);
            }

            return {
                data: {
                    startDateTime: format(startDateTime, "do LLL yyyy - HH:mm"),
                    endDateTime: format(endDateTime, "do LLL yyyy - HH:mm"),
                    timeSpent: differenceInMinutes(endDateTime, startDateTime),
                },
                error: null
            }
        } catch (e) {
            return {
                data: null,
                error: true,
            }
        }
    }

    const infoBoxData = calculateInfoBox();

    return (
        <>
            <div className="flex justify-start gap-1 items-center">
                <RiCalendarScheduleLine />
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Event Time</p>
            </div>
            <p className="pt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Start Date</p>
            <DatePicker value={props.startDate} onValueChange={props.onStartDateChange} />
            <p className="pt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Start Time:</p>
            <TimeInput value={props.startTime} onValueChange={props.onStartTimeChange} />
            <p className="pt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">End Time:</p>
            <TimeInput value={props.endTime} onValueChange={props.onEndTimeChange} />

            <p className="pt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Intensity:</p>
            <NumberInput error={!props.intensity} min={1} max={5} value={props.intensity} onValueChange={props.onIntensityChange} />

            <Callout className="my-6 h-32" title="Time Summary" icon={RiInformationLine} >
                {!infoBoxData.error && infoBoxData.data ? <>
                    <span className="pt-1"><span className={"font-medium"}>Start Time: </span>{infoBoxData.data.startDateTime}</span>
                    <span className="pt-1"><span className={"font-medium"}><br />End Time: </span>{infoBoxData.data.endDateTime}</span>
                    <span className="pt-1"><span className={"font-medium"}><br />Time Spent: </span>{infoBoxData.data.timeSpent}</span>
                </> : <span>Please enter valid start and end times using the format - (HH:MM)</span>}
            </Callout>
        </>
    );
}
