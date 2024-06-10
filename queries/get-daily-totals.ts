import { DailyTotal } from "@/types/dashbard-data";
import { INTENSITY_TIME_WEIGHT } from "@/types/metrics";
import { createClient } from "@/utils/supabase/client";
import { timeInMin } from "@/utils/supabase/metric-utils";
import { addDays, differenceInDays, format } from "date-fns";


export default async function getDailyTotals(startDate: Date, endDate: Date): Promise<DailyTotal[]> {
    const client = createClient();
    let { data, error } = await client
        .rpc('daily_totals', {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            intensity_time_weight: INTENSITY_TIME_WEIGHT,
        });
    if (!data || error) {
        //TODO: MAKE THIS BETTER
        throw Error("TODO: MAKE THIS BETTER");
    }

    let n = differenceInDays(endDate, startDate);
    if (n > 100) {
        const date = new Date(data[0].date || startDate);
        date.setDate(date.getDate() - 5);
        n = differenceInDays(endDate, date);
    }
    const dataJson: { [key: string]: DailyTotal } = {}
    data?.forEach(d => {
        dataJson[d.date] = {
            date: d.date,
            count: d.count,
            time: timeInMin(d.time),
            intensity: d.intensity,
            intensity_time: timeInMin(d.intensity_time)
        }
    });
    const resultArr: DailyTotal[] = [];
    for (let i = 0; i <= n; i++) {
        let date = addDays(new Date(), (-n + i));
        let formattedDate = format(date, 'yyyy-MM-dd');
        resultArr.push({
            date: format(date, 'LLL d'),
            count: dataJson[formattedDate]?.count || 0,
            time: dataJson[formattedDate]?.time || 0,
            intensity: dataJson[formattedDate]?.intensity || 0,
            intensity_time: dataJson[formattedDate]?.intensity_time || 0,
        });
    }
    return resultArr;
}


