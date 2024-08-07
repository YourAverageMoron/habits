"use client"

import { HourOfDayAverages } from "@/types/dashbard-data";
import DashboardCard from "../DashboardCard";
import { Category } from "@/types/categories";
import { BarChart } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import getHoursOfDayAverages from "@/queries/get-hours-of-day-averages";
import { MetricNameKeys, MetricsMetadata } from "@/types/metrics";


type HoursOfDayBarCardProps = {
    startDate: Date,
    endDate: Date,
    categories: Category[]
    metrics: Set<MetricNameKeys>
}

export default function(props: HoursOfDayBarCardProps) {
    // TODO: USE CATEGORIES
    const queryResult = useQuery({
        queryKey: ["hours-of-day-averages", props.startDate, props.endDate],
        queryFn: () => getHoursOfDayAverages(props.startDate, props.endDate)
    });

    const metrics = Object.entries(MetricsMetadata).filter(v => props.metrics.has(v[0] as MetricNameKeys)).map(v => v[1]);
    function content(d: HourOfDayAverages[]) {
        return (<>
            <BarChart
                data={d}
                index="hour"
                categories={metrics.map(m => m.name)}
                colors={metrics.map(m => m.color)}
                yAxisWidth={48}
            // onValueChange={(v) => console.log(v)}
            />
        </>)
    }

    function transform(data: HourOfDayAverages[]): HourOfDayAverages[] {
        return data;
    }

    return <DashboardCard
        className="col-span-1 md:col-span-2 lg:col-span-3"
        title="Hours of Day"
        queryResult={queryResult}
        content={content}
        dataTransform={transform}
    />

}
