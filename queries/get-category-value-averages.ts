import { CategoryValueAverage } from "@/types/category-value-average";
import { createClient } from "@/utils/supabase/client";

export default async function getCategoryValueAverages(): Promise<CategoryValueAverage[]> {
    const n = 100
    const client = createClient();
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


