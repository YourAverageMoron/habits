import { DailyTotal } from "@/types/dashbard-data";
import { createClient } from "@/utils/supabase/client";
import { addDays, format } from "date-fns";


// TODO: THIS NEEDS TO TAKE IN N (or the dates) AS A PARAMETER
export default async function getDailyTotals(): Promise<DailyTotal[]> {
    const n = 100
    const client = createClient();
    let { data, error } = await client
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
    const resultArr: DailyTotal[] = [];
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


