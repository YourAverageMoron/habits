import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { Card, Grid, LineChart, ValueFormatter } from "@tremor/react";
import { addDays, format } from "date-fns";
import { cookies } from "next/headers";
import React from "react";


type LineChartData = {
    date: string,
    count: number,
    totalTime: number,
}

async function createLastNDaysData(n: number, supabase: SupabaseClient<Database>): Promise<LineChartData[]> {
    let { data, error } = await supabase
        .rpc('total_time_over_days', {
            n: `${n} day`
        });

    const dataJson: { [key: string]: { count: number, totalTime: number } } = {}
    data?.forEach(d => {
        let splitTime = d.sum.split(':');
        let timeInMin = (Number(splitTime[0]) * 60) + Number(splitTime[1]) + (Number(splitTime[2]) / 60)
        dataJson[d.start_date] = {
            count: d.count,
            totalTime: timeInMin,
        }
    });

    const resultArr: LineChartData[] = [];

    for (let i = 0; i <= n; i++) {
        console.log(-n + i);
        let date = addDays(new Date(), (-n + i));
        console.log(date);
        let formattedDate = format(date, 'yyyy-MM-dd');
        resultArr.push({
            date: format(date, 'do LLL'),
            count: dataJson[formattedDate]?.count || 0,
            totalTime: dataJson[formattedDate]?.totalTime || 0,
        });
    }

    console.log(resultArr);
    return resultArr;
}


export default async function() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const days = 30;

    const data = await createLastNDaysData(days, supabase);
    return <>
        <Card>
            <p>Total Time</p>
            <LineChart
                className="h-80"
                data={data}
                index="date"
                categories={['totalTime']}
                colors={['fuchsia', 'cyan']}
                // valueFormatter={(value: number) => `${value} mins`}
                connectNulls={true}
                rotateLabelX={{ angle: 90, xAxisHeight: 100, verticalShift: 50 }}
            />
        </Card>
    </>
}
