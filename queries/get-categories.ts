import { Category } from "@/types/categories";
import { createClient } from "@/utils/supabase/client";

export default async function getCategories(): Promise<Category[]> {
    const client = createClient();
    const { data, error } = await client.from("event_tag_categories")
        .select("id, name")

    if (error || !data) {
        //TODO: MAKE A BETTER ERROR FOR THIS
        throw Error("TODO MAKE A BETTER ERROR");
    }
    return data;
}



