"use client"
import { Button, Flex, ProgressBar } from "@tremor/react";
import EventDateTimeAndIntensity from "./EventDateTimeAndIntensity";
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine, } from "@remixicon/react";
import { useState } from "react";
import { addMinutes, format } from "date-fns";
import { TagsGrid, TagsGridData } from "./TagsGrid";
import Journal from "./Journal";
import { createClient } from "@/utils/supabase/client";
import { timeValidation } from "./TimeInput";


type TagCategories = {
    id: number;
    name: string;
    category_index: number | null;
}

type CreateEventProps = {
    tagsCategories: TagCategories[] | null
}


type Tags = {
    [key: number]: TagsGridData;
}


export default function CreateEvent(props: CreateEventProps) {
    const supabase = createClient();
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState<string>(format(addMinutes(startDate, -5), "HH:mm"));
    const [endTime, setEndTime] = useState<string>(format(startDate, "HH:mm"));
    const [intensity, setIntensity] = useState<number>(1);
    const [tagsCategories, setTagsCategories] = useState<Tags>(props.tagsCategories?.reduce((acc, cur) => { return { ...acc, ...{ [cur.id]: {} } } }, {}) || {});
    const [journalValue, setJournalValue] = useState<string>("");

    const calculateProgress = (pages: any[]) => {
        return (pageIndex) / (pages.length - 1) * 100;
    }

    const validateData = () =>{
       return timeValidation(startTime) || timeValidation(endTime) || !intensity; 
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

    const updateTagCategories = (catagoryId: number, value: TagsGridData) => {
        setTagsCategories({ ...tagsCategories, ...{ [catagoryId]: value } });
    }

    const submitEvent = async () => {
        const dates = getStartAndEndDateTimes();
        // TODO this should be handled in one transaction, might need a CTE or a postgres function
        const { data, error } = await supabase
            .from('events')
            .insert([
                { start_time: dates.startDateTime.toISOString(), end_time: dates.endDateTime.toISOString(), intesity: intensity, journal: journalValue },
            ])
            .select();
        if (!data || error) {
            alert("Something went wront - unable to submit event");
            window.location.reload();
            return;
        }
        const selectedTags = [];
        for (const [stringCategoryId, categoryValue] of Object.entries(tagsCategories)) {
            let categoryId = Number(stringCategoryId);
            for (let [tagDataKey, tagDataValue] of Object.entries(categoryValue)) {
                if (tagDataValue.selected) {
                    selectedTags.push({
                        category_id: categoryId,
                        event_id: data[0].id,
                        value: tagDataKey,
                    });
                }
            }
        }
        await supabase
            .from('event_tags')
            .insert(selectedTags);
        window.location.reload();
    }

    const tagsPages = props.tagsCategories?.map(tagCategory => <TagsGrid key={tagCategory.id} title={tagCategory.name} value={tagsCategories[tagCategory.id]} onValueChange={(value) => updateTagCategories(tagCategory.id, value)} />) || [];
    const pages = [
        <EventDateTimeAndIntensity
            startDate={startDate}
            startTime={startTime}
            endTime={endTime}
            intensity={intensity}
            onStartDateChange={(value) => setStartDate(value)}
            onStartTimeChange={(value) => setStartTime(value)}
            onEndTimeChange={(value) => setEndTime(value)}
            onIntensityChange={(value) => setIntensity(value)}
        />,
        ...tagsPages,
        <Journal value={journalValue} onValueChange={(value) => setJournalValue(value)} />
    ]


    return <div className="h-full">
        <ProgressBar className={"py-6"} value={calculateProgress(pages)} />
        <div className="mb-16">
            {pages[pageIndex]}
        </div>
        <Flex className="mb-6 absolute inset-x-0 bottom-0 h-16" justifyContent={"evenly"}>
            <Button disabled={pageIndex == 0} icon={RiArrowLeftLine} iconPosition={"left"} variant={'secondary'} onClick={() => setPageIndex(pageIndex - 1)}>
                Back
            </Button>
            {pageIndex == pages.length - 1 ?
                <Button disabled={validateData()} icon={RiCheckLine} iconPosition={"right"} variant={'primary'} onClick={() => submitEvent()}>
                    Submit
                </Button>
                :
                <Button disabled={validateData()} icon={RiArrowRightLine} iconPosition={"right"} variant={'primary'} onClick={() => setPageIndex(pageIndex + 1)}>
                    Next
                </Button>
            }
        </Flex>
    </div>
}

