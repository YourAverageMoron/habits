"use client"

import getCategoryValueAverages from "@/queries/get-category-value-averages";
import { CategoryValueAverage } from "@/types/dashbard-data";
import { useQuery } from "@tanstack/react-query";
import { DonutChart, Legend, MultiSelect, MultiSelectItem, Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import DashboardCard from "../DashboardCard";
import { Category } from "@/types/categories";
import { MetricsMetadata, MetricNameKeys } from "@/types/metrics";


type CategoryDistributionPieChartProps = {
    startDate: Date,
    endDate: Date,
    categories: Category[]

}

function filterData(data: CategoryValueAverage[], selectedCategories: Set<string>) {
    if (selectedCategories.size == 0) { return data }
    return data.filter(d => selectedCategories.has(d.category_id.toString()));
}

export default function(props: CategoryDistributionPieChartProps) {
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [selectedMetric, setSelectedMetric] = useState<MetricNameKeys>("count");
    const queryResult = useQuery({
        queryKey: ['category-value-averages', props.startDate, props.endDate],
        queryFn: () => getCategoryValueAverages(props.startDate, props.endDate)
    });
    function content(d: CategoryValueAverage[]) {
        const categories = d.map(v => v.category_value);
        return (<>
            <div className="flex">
                <MultiSelect value={Array.from(selectedCategories)} onValueChange={v => setSelectedCategories(new Set(v))}>
                    {props.categories.map(c => <MultiSelectItem value={c.id.toString()}>{c.name}</MultiSelectItem>
                    )}
                </MultiSelect>
                <Select value={selectedMetric} onValueChange={v => setSelectedMetric(v as MetricNameKeys)}>
                    {Object.keys(MetricsMetadata).map(m => <SelectItem value={m}>{MetricsMetadata[m as MetricNameKeys].name}</SelectItem>
                    )}
                </Select>
            </div>
            <div className="flex items-center justify-center space-x-6">
                <DonutChart
                    data={d}
                    variant="pie"
                    index="category_value"
                    category={selectedMetric}
                />
                <Legend
                    categories={categories.slice(0, 22)}
                    className="max-w-xs"
                />
            </div>
        </>)
    }
    function transform(data: CategoryValueAverage[]): CategoryValueAverage[] {
        // TODO: IS THERE A BETTER WAY TO DO THIS?
        if (selectedMetric === "count" || selectedMetric === "time" || selectedMetric === "intensity" || selectedMetric === "intensity_time") {
            return filterData(data, selectedCategories).sort((a, b) => b[selectedMetric] - a[selectedMetric]);
        }

        return [];
    }

    return <DashboardCard
        className="col-span-1 md:col-span-1 lg:col-span-1"
        title="Category Averages"
        queryResult={queryResult}
        content={content}
        dataTransform={transform}
    />

}
