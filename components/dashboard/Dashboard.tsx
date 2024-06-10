"use client"
import { DateRangePicker, DateRangePickerValue, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import React, { useState } from "react";
import DashboardSummary from "./DashboardSummary";
import DashboardCategories from "./DashboardCategories";
import { useQuery } from "@tanstack/react-query";
import getCategories from "@/queries/get-categories";


function getInitialFromDate(): Date {
    let d = new Date()
    d = new Date(d.setDate(d.getDate() - 101))
    return d
}

export default function() {
    const categoriesQueryResult = useQuery({
        queryKey: ['categores'],
        queryFn: getCategories,
    });
    const categories = categoriesQueryResult.data || [];
    const [dates, setDates] = useState<DateRangePickerValue>({
        from: getInitialFromDate(),
        to: new Date(),
    });

    const startDate = dates?.from || new Date(1);
    const endDate = dates?.to || new Date();

    // NOTE: HARDCODED FUCHSIA AS THERE IS A BUG IN TREMOR https://github.com/tremorlabs/tremor/issues/1071
    return <div className="sm:px-0.5 md:px-6 mt-6">
        <div className="flex">
            <DateRangePicker value={dates} onValueChange={v => setDates(v)} className="mx-auto max-w-md" />

        </div>
        <TabGroup className="w-full">
            <TabList color={'fuchsia'} variant="line" defaultValue="1">
                <Tab value="1">Summary</Tab>
                <Tab value="2">Categories</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <DashboardSummary categories={categories} startDate={startDate} endDate={endDate} />
                </TabPanel>
                <TabPanel>
                    <DashboardCategories categories={categories} startDate={startDate} endDate={endDate} />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
}
