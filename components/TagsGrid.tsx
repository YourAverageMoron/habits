"use client"
import { RiCalendarScheduleLine, } from "@remixicon/react";


type TagsGridProps = {
    tags: {

    },
}

export default function TagsGrid(props: TagsGridProps) {


    return (
        <>
            <div className="flex justify-start gap-1 items-center">
                <RiCalendarScheduleLine />
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Event Time</p>
            </div>
            <p className="pt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Start Date</p>
        </>
    );
}
