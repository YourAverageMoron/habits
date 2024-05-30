"use client"

import getCategoryValueAverages from "@/queries/get-category-value-averages";
import { CategoryValueAverage } from "@/types/category-value-average";
import { useQuery } from "@tanstack/react-query";
import { DonutChart, Legend, MultiSelect, MultiSelectItem } from "@tremor/react";
import { useState } from "react";
import DashboardCard from "./DashboardCard";
import { Category } from "@/types/tags";


type CategoryDistributionPieChartProps = {
    startDate?: Date,
    endDate?: Date,
    categories: Category[]

}

function filterData(data: CategoryValueAverage[], selectedCategories: Set<string>) {
    if (selectedCategories.size == 0) { return data }
    return data.filter(d => selectedCategories.has(d.category_id.toString()));
}

export default function(props: CategoryDistributionPieChartProps) {
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const queryResult = useQuery({ queryKey: ["category-averages"], queryFn: getCategoryValueAverages });

    const metric = "count"; //TODO: THIS SHOULDNT BE HARDCODED
    function content(d: CategoryValueAverage[]) {
        return (<>
            <div className="flex">
                <MultiSelect value={Array.from(selectedCategories)} onValueChange={v => setSelectedCategories(new Set(v))}>
                    {props.categories.map(c => <MultiSelectItem value={c.id.toString()}>{c.name}</MultiSelectItem>
                    )}
                </MultiSelect>
            </div>
            <div className="flex items-center justify-center space-x-6">
                <DonutChart
                    data={d}
                    variant="pie"
                    index="category_value"
                    category={metric}
                />
                <Legend
                    categories={d.map(data => data.category_value)}
                    className="max-w-xs" />
            </div>
        </>)
    }

    function transform(data: CategoryValueAverage[]) {
        return filterData(data, selectedCategories).sort((a, b) => b[metric] - a[metric]);

    }

    return <DashboardCard
        className="col-span-1 md:col-span-1 lg:col-span-1"
        title="Category Averages"
        queryResult={queryResult}
        content={content}
        dataTransform={transform}
    />

}
