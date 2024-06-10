import { HourOfDayAverages as HoursOfDayAverages } from "@/types/dashbard-data";
import { INTENSITY_TIME_WEIGHT } from "@/types/metrics";
import { createClient } from "@/utils/supabase/client";
import { timeInMin } from "@/utils/supabase/metric-utils";


export default async function getHoursOfDayAverages(startDate: Date, endDate: Date): Promise<HoursOfDayAverages[]> {
    const client = createClient();
    let { data, error } = await client
        .rpc('hour_of_day', {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            intensity_time_weight: INTENSITY_TIME_WEIGHT,
        });
    if (!data || error) {
        throw Error("couldnt load data");
    }

    let di = 0;
    let r = [];
    for (let hour = 0; hour < 24; hour++) {
        let hourData = {
            hour: hour,
            count: 0,
            time: 0,
            intensity: 0,
            intensity_time: 0,
        }
        if (data[di] && data[di].hour == hour) {
            hourData["count"] = data[di].count;
            hourData["time"] = timeInMin(data[di].time);
            hourData["intensity"] = data[di].intensity;
            hourData["intensity_time"] = timeInMin(data[di].intensity_time);
            di++;
        }
        r.push(hourData);
    }
    return r;
}


