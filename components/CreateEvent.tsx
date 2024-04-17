"use client"
import { Button, Flex, ProgressBar } from "@tremor/react";
import EventDateTime from "./EventDateTime";
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine, } from "@remixicon/react";
import { useState } from "react";
import { addMinutes, format } from "date-fns";
import { TagsGrid, TagsGridData, getSelectedTags } from "./TagsGrid";
import Journal from "./Journal";

export default function CreateEvent() {

    const [pageIndex, setPageIndex] = useState<number>(0);

    const [startDate, setStartDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState<string>(format(addMinutes(startDate, -5), "HH:mm"));
    const [endTime, setEndTime] = useState<string>(format(startDate, "HH:mm"));

    const [areasAffectedTags, setAreasAffectedTags] = useState<TagsGridData>({});
    const [moodTags, setMoodTags] = useState<TagsGridData>({});
    const [situationTags, setSituationTags] = useState<TagsGridData>({});
    const [locationTags, setLocationTags] = useState<TagsGridData>({});
    const [otherTags, setOtherTags] = useState<TagsGridData>({});

    const [journalValue, setJournalValue] = useState<string>("");

    const pages = [
        <EventDateTime
            startDate={startDate}
            startTime={startTime}
            endTime={endTime}
            onStartDateChange={(value) => setStartDate(value)}
            onStartTimeChange={(value) => setStartTime(value)}
            onEndTimeChange={(value) => setEndTime(value)}
        />,
        <TagsGrid title={"Areas Affected"} value={areasAffectedTags} setValue={setAreasAffectedTags} />,
        <TagsGrid title={"Mood"} value={moodTags} setValue={setMoodTags} />,
        <TagsGrid title={"Situation"} value={situationTags} setValue={setSituationTags} />,
        <TagsGrid title={"Location"} value={locationTags} setValue={setLocationTags} />,
        <TagsGrid title={"Other"} value={otherTags} setValue={setOtherTags} />,
        <Journal value={journalValue} onValueChange={(value) => setJournalValue(value)} />
    ]

    const calculateProgress = () => {
        return (pageIndex) / (pages.length - 1) * 100;
    }

    const getStartAndEndDateTimes = () => {
        const startSplit = startTime.split(':');
        const endSplit = endTime.split(':');
        const startDateTime = new Date(startDate.getTime());;
        startDateTime.setHours(parseInt(startSplit[0]), parseInt(startSplit[1]), 0, 0);
        const endDateTime = new Date(startDate.getTime());;
        endDateTime.setHours(parseInt(endSplit[0]), parseInt(endSplit[1]), 0, 0);

        return {
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        }
    }

    const submitEvent = () => {
        console.log(getStartAndEndDateTimes());
        console.log(getSelectedTags(moodTags));
    }

    return <div className="h-full">
        <ProgressBar className={"py-6"} value={calculateProgress()} />
        <div className="mb-16">
            {pages[pageIndex]}
        </div>
        <Flex className="mb-6 absolute inset-x-0 bottom-0 h-16" justifyContent={"evenly"}>
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
    </div>
}

