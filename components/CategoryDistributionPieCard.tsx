"use client"

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Card, DonutChart, Legend, Metric, MultiSelect, MultiSelectItem } from "@tremor/react";
import { useEffect, useState } from "react";


type PieData = {
    category_value: string;
    category_id: number,
    count: number;
    average_time: string;
    average_intensity: number;
}


function getDays(startDate?: Date, endDate?: Date) {
    return 100; // TODO: IMPLEMENT THIS
}

type CategoryDistributionPieChartProps = {
    startDate?: Date,
    endDate?: Date,
}

type Category = {
    id: number,
    name: string,
}

async function getCategories(client: SupabaseClient<Database>) {
    let { data, error } = await client
        .from('event_tag_categories')
        .select('id, name');
    if (!data) {
        // TODO: HANDLE THIS PROPERLY
        throw Error("TODO SOMETHING ELSE HERE");
    }
    return data;
}

async function getData(n: number, client: SupabaseClient<Database>) {
    let { data, error } = await client
        .rpc('category_averages', {
            n: `${n} day`,
        });

    if (!data) {
        // TODO: HANDLE THIS PROPERLY
        throw Error("TODO SOMETHING ELSE HERE");
    }
    return data;
}

function filterData(data: PieData[], selectedCategories: Set<string>) {
    if (selectedCategories.size == 0) { return data }
    return data.filter(d => selectedCategories.has(d.category_id.toString()));
}

export default function(props: CategoryDistributionPieChartProps) {

    const client = createClient();

    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
    const [data, setData] = useState<PieData[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchData() {
            setIsLoadingCategories(true);
            try {
                const response = await getCategories(client);
                setCategories(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingCategories(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            setIsLoadingData(true);
            try {
                const response = await getData(getDays(props.startDate, props.endDate), client);
                setData(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingData(false);
            }
        }
        fetchData();
    }, []);

    const category = "count"; //TODO: THIS SHOULDNT BE HARDCODED

    const filteredData = filterData(data, selectedCategories).sort((a, b) => b[category] - a[category]);
    return <Card className="col-span-1 md:col-span-1 lg:col-span-1">
        <Metric className="pb-4 ml-4">Category Breakdown</Metric>
        <div className="flex">
            <MultiSelect value={Array.from(selectedCategories)} onValueChange={v => setSelectedCategories(new Set(v))}>
                {categories.map(c => <MultiSelectItem value={c.id.toString()}>{c.name}</MultiSelectItem>
                )}
            </MultiSelect>
        </div>
        <div className="flex items-center justify-center space-x-6">
            <DonutChart
                data={filteredData}
                variant="pie"
                index="category_value"
                category={category}
            />
            <Legend
                categories={filteredData.map(d => d.category_value)}
                className="max-w-xs" />

        </div>
    </Card>
}
