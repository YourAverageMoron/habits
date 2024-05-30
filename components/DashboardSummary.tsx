import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { BarChart, Card, LineChart, Metric } from "@tremor/react";
import { count } from "console";
import { format } from "date-fns";
import { addDays } from "date-fns";

type LineChartData = {
    date: string,
    count: number,
    totalTime: number,
}

type HourOfDayChartData = {
    hour: number,
    count: number,
    // average: string,
}


type DashboardSummaryProps = {
    startDate?: Date;
    endDate?: Date;
    tags: string[]
    client: SupabaseClient<Database>
}


function getDays(startDate?: Date, endDate?: Date) {
    return 100; // TODO: IMPLEMENT THIS
}


async function createHoursOfDayDate(n: number, client: SupabaseClient<Database>): Promise<HourOfDayChartData[]> {
    let { data, error } = await client
        .rpc('hour_of_day', {
            n: `${n} day`
        });
    if (!data) {
        throw Error("couldnt load data");
    }

    let di = 0;
    let r = [];
    for (let ri = 0; ri < 24; ri++) {
        let count = 0;
        if (data[di] && data[di].hour == ri) {
            count = data[di].count;
            di++;
        }
        r.push({
            hour: ri,
            count: count,
        });
    }
    return r;
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
        let date = addDays(new Date(), (-n + i));
        let formattedDate = format(date, 'yyyy-MM-dd');
        resultArr.push({
            date: format(date, 'LLL d'),
            count: dataJson[formattedDate]?.count || 0,
            totalTime: dataJson[formattedDate]?.totalTime || 0,
        });
    }
    return resultArr;
}

export default async function(props: DashboardSummaryProps) {
    const days = getDays(props.startDate, props.endDate);

    const data = await createLastNDaysData(days, props.client);
    const barData = await createHoursOfDayDate(days, props.client);
    return <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <Card className="px-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Metric className="ml-4">Total Time</Metric>
            <LineChart
                className="h-80"
                curveType="monotone"
                data={data}
                index="date"
                categories={['totalTime']}
                colors={['fuchsia', 'cyan']}
                // valueFormatter={(value: number) => `${value} mins`}
                connectNulls={true}
            // rotateLabelX={{ angle: 90, xAxisHeight: 100, verticalShift: 50 }}
            />
        </Card>
        <Card className="px-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Metric className="ml-4">Times of day</Metric>
            <BarChart
                data={barData}
                index="hour"
                categories={['count']}
                colors={['fuchsia']}
                yAxisWidth={48}
            // onValueChange={(v) => console.log(v)}
            />
        </Card>
    </div>
}


