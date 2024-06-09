"use client"
import { DateRangePicker, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import React from "react";
import DashboardSummary from "./DashboardSummary";
import DashboardCategories from "./DashboardCategories";
import { useQuery } from "@tanstack/react-query";
import getCategories from "@/queries/get-categories";


export default function() {
    const categoriesQueryResult = useQuery({
        queryKey: ['categores'],
        queryFn: getCategories,
    });
    const categories = categoriesQueryResult.data || [];


    // TODO: THERE SHOULD BE A FILTER THAT SELECTS THESE
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);
    const endDate = new Date();

    // NOTE: HARDCODED FUCHSIA AS THERE IS A BUG IN TREMOR https://github.com/tremorlabs/tremor/issues/1071
    return <div className="sm:px-0.5 md:px-6 mt-6">
        <div className="flex">
            <DateRangePicker className="mx-auto max-w-md" />

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
