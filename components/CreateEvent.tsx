"use client"
import { Button, Flex, ProgressBar } from "@tremor/react";
import EventDateTimeAndIntensity from "./EventDateTimeAndIntensity";
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine, } from "@remixicon/react";
import { useState } from "react";
import { addDays, addMinutes, format } from "date-fns";
import { TagsGrid } from "./TagsGrid";
import Journal from "./Journal";
import { createClient } from "@/utils/supabase/client";
import { timeValidation } from "./TimeInput";
import assert from "assert";
import { useRouter } from "next/navigation";
import { CreateEventCategories, CreateEventTags } from "@/types/categories";


type CreateEventProps = {
    categories: CreateEventCategories
}


export default function CreateEventComponent(props: CreateEventProps) {
    const supabase = createClient();
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [startTime, setStartTime] = useState<string>(format(addMinutes(startDate ? startDate : new Date(), -5), "HH:mm"));
    const [endTime, setEndTime] = useState<string>(format(startDate ? startDate : new Date(), "HH:mm"));
    const [intensity, setIntensity] = useState<number>(1);
    const [tagsCategories, setTagsCategories] = useState<CreateEventCategories>(props.categories || {});
    const [journalValue, setJournalValue] = useState<string>("");
    const router = useRouter()
    const calculateProgress = (pages: any[]) => {
        return (pageIndex) / (pages.length - 1) * 100;
    }
    const validateData = () => {
        return timeValidation(startTime) || timeValidation(endTime) || !intensity;
    }
    const getStartAndEndDateTimes = () => {
        assert(startDate != undefined);
        const startSplit = startTime.split(':');
        const endSplit = endTime.split(':');
        const startDateTime = new Date(startDate.getTime());;
        startDateTime.setHours(parseInt(startSplit[0]), parseInt(startSplit[1]), 0, 0);
        let endDateTime = new Date(startDate.getTime());;
        endDateTime.setHours(parseInt(endSplit[0]), parseInt(endSplit[1]), 0, 0);

        if (endDateTime < startDateTime) {
            endDateTime = addDays(endDateTime, 1);
        }

        return {
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        }
    }
    const updateTagCategories = (categoryId: number, value: CreateEventTags) => {
        let newCategories = { ...tagsCategories };
        newCategories[categoryId].tags = value;
        setTagsCategories(newCategories);
    }

    const submitEvent = async () => {
        const dates = getStartAndEndDateTimes();
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    start_time: dates.startDateTime.toISOString(),
                    end_time: dates.endDateTime.toISOString(),
                    intensity: intensity,
                    journal: journalValue,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

                },
            ])
            .select();
        if (!data || error) {
            alert("Something went wrong - unable to submit event");
            router.push('/');
            return;
        }
        const selectedTags = [];
        for (const [stringCategoryId, categoryValue] of Object.entries(tagsCategories)) {
            let categoryId = Number(stringCategoryId);
            for (let [tagDataKey, tagDataValue] of Object.entries(categoryValue.tags)) {
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
        router.push('/');


    }
    const tagsPages = Object.entries(
        props.categories || {}
    ).sort((a, b) => a[1].index - b[1].index
    ).map(([key, value]) => <TagsGrid key={key} title={value.name} value={value.tags} onValueChange={(value) => updateTagCategories(Number(key), value)} />) || [];
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

    return <div className="h-full mx-3">
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

