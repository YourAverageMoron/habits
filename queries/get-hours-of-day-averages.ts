import { HourOfDayAverages as HoursOfDayAverages } from "@/types/dashbard-data";
import { createClient } from "@/utils/supabase/client";


export default async function getHoursOfDayAverages(startDate: Date, endDate: Date): Promise<HoursOfDayAverages[]> {
    const n = 100
    const client = createClient();
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


