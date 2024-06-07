import { CategoryValueAverage } from "@/types/dashbard-data";
import { INTENSITY_TIME_WEIGHT } from "@/types/metrics";
import { createClient } from "@/utils/supabase/client";

// TODO: THIS NEEDS TO TAKE IN N as an argument
export default async function getCategoryValueAverages(): Promise<CategoryValueAverage[]> {
    const n = 100
    const client = createClient();
    let { data, error } = await client
        .rpc('category_averages', {
            n: `${n} day`,
            intensity_time_weight: INTENSITY_TIME_WEIGHT
        });

    if (!data) {
        // TODO: HANDLE THIS PROPERLY
        throw Error("TODO SOMETHING ELSE HERE");
    }
    return data.map(d => {
        let splitTime = d.time.split(':');
        let timeInMin = (Number(splitTime[0]) * 60) + Number(splitTime[1]) + (Number(splitTime[2]) / 60)
        let splitIntensityTime = d.time.split(':');
        let intensityTimeInMin = (Number(splitIntensityTime[0]) * 60) + Number(splitIntensityTime[1]) + (Number(splitIntensityTime[2]) / 60)
        return {
            ...d,
            time: timeInMin,
            intensity_time: intensityTimeInMin,
        }
    })
}


