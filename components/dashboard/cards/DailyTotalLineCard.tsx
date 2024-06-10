"use client"

import { DailyTotal } from "@/types/dashbard-data";
import DashboardCard from "../DashboardCard";
import { Category } from "@/types/tags";
import { LineChart } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import getDailyTotals from "@/queries/get-daily-totals";
import { MetricNameKeys, MetricsMetadata } from "@/types/metrics";


type DailyTotalLineCardProps = {
    startDate: Date,
    endDate: Date,
    categories: Category[]
    metrics: Set<MetricNameKeys>
}

export default function(props: DailyTotalLineCardProps) {
    // TODO: USE CATEGORIES
    const queryResult = useQuery({
        queryKey: ["daily-totals", props.startDate, props.endDate],
        queryFn: () => getDailyTotals(props.startDate, props.endDate)
    });

    const metrics = Object.entries(MetricsMetadata).filter(v => props.metrics.has(v[0] as MetricNameKeys)).map(v => v[1]);
    function content(d: DailyTotal[]) {
        return (<>
            <LineChart
                className="h-80"
                curveType="monotone"
                data={d}
                index="date"
                categories={metrics.map(m => m.name)}
                colors={metrics.map(m => m.color)}
                // valueFormatter={(value: number) => `${value} mins`}
                connectNulls={true}
            // rotateLabelX={{ angle: 90, xAxisHeight: 100, verticalShift: 50 }}
            />
        </>)
    }

    function transform(data: DailyTotal[]): DailyTotal[] {
        return data;
    }

    return <DashboardCard
        className="col-span-1 md:col-span-2 lg:col-span-3"
        title="Daily Totals"
        queryResult={queryResult}
        content={content}
        dataTransform={transform}
    />

}
