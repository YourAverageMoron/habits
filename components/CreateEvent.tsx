"use client"
import { Button, Flex, ProgressBar } from "@tremor/react";
import EventDateTime from "./EventDateTime";
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine, } from "@remixicon/react";
import { useState } from "react";
import { addMinutes, format } from "date-fns";

export default function CreateEvent() {

    const [pageIndex, setPageIndex] = useState<number>(0);

    const [startDate, setStartDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState<string>(format(startDate, "HH:mm"));
    const [endTime, setEndTime] = useState<string>(format(addMinutes(startDate, 5), "HH:mm"));


    const pages = [
        <EventDateTime
            startDate={startDate}
            startTime={startTime}
            endTime={endTime}
            onStartDateChange={(value) => setStartDate(value)}
            onStartTimeChange={(value) => setStartTime(value)}
            onEndTimeChange={(value) => setEndTime(value)}
        />,
        <p> Page 2 </p>,
        <p> Page 3 </p>,
        <p> Page 4 </p>,
        <p> Page 5 </p>,
        <p> Page 6 </p>,
    ]

    const calculateProgress = () => {
        return (pageIndex) / (pages.length - 1) * 100;
    }

    const submitEvent = () => {

    }

    return <>
        <ProgressBar className={"py-6"} value={calculateProgress()} />
        {pages[pageIndex]}
        <Flex justifyContent={"between"}>
            <Button disabled={pageIndex == 0} icon={RiArrowLeftLine} iconPosition={"left"} variant={'secondary'} onClick={() => setPageIndex(pageIndex - 1)}>
                Back
            </Button>
            {pageIndex == pages.length - 1 ?
                <Button icon={RiCheckLine} iconPosition={"right"} variant={'primary'} onClick={() => submitEvent()}>
                    Submit
                </Button>
                :
                <Button icon={RiArrowRightLine} iconPosition={"right"} variant={'primary'} onClick={() => setPageIndex(pageIndex + 1)}>
                    Next
                </Button>
            }
        </Flex>
    </>
}

