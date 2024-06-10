import DailyTotalLineCard from "./cards/DailyTotalLineCard";
import { Category } from "@/types/categories";
import HoursOfDayBarCard from "./cards/HoursOfDayBarCard";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { useState } from "react";
import { MetricNameKeys, MetricsMetadata } from "@/types/metrics";

type DashboardSummaryProps = {
    startDate: Date;
    endDate: Date;
    categories: Category[]
}

export default function(props: DashboardSummaryProps) {
    const [metrics, setMetrics] = useState<MetricNameKeys[]>(["time"])

    return <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <MultiSelect value={metrics} onValueChange={v => setMetrics(v as MetricNameKeys[])} className="my-3 mx-auto max-w-md">
            {Object.keys(MetricsMetadata).map(m => <MultiSelectItem value={m}>{MetricsMetadata[m as MetricNameKeys].name}</MultiSelectItem>
            )}
        </MultiSelect>

        <DailyTotalLineCard metrics={new Set(metrics)} categories={props.categories} startDate={props.startDate} endDate={props.endDate} />
        <HoursOfDayBarCard metrics={new Set(metrics)} categories={props.categories} startDate={props.startDate} endDate={props.endDate} />
    </div>
}


