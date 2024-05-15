import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { isLoggedIn } from "@/utils/supabase/checkLogin";
import CreateEventComponent from "@/components/CreateEvent";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";

async function createEventCategories(supabase: SupabaseClient<Database>) {
    let categories = await supabase
        .from('event_tag_categories')
        .select('id, name, category_index')
        .order("category_index");

    if (!categories.data || categories.error) {
        //TODO: throw an error or something 
        return;
    }
    let tags = await supabase.rpc('get_tag_values', {
        categories: categories.data.map(category => category.id)
    })
    const categoriesMap: Categories = categories.data.reduce((acc: Categories, cur) => {
        return {
            ...acc, ...{
                [cur.id]: {
                    index: cur.category_index,
                    name: cur.name,
                    tags: {}
                }
            }
        }
    }, {}) || {}
    tags.data?.forEach(tag => categoriesMap[tag.category_id].tags[tag.value] = { selected: false });
    return categoriesMap;
}
export default async function CreateEvent() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await isLoggedIn(supabase)

    const data = await createEventCategories(supabase);

    if (!data) {
        alert("Unable to load tags from the server, please ensure you are connected to the internet");
        redirect("/");
    }
    return (
        <main className="">
            <Nav />
            <CreateEventComponent categories={data} />
        </main >
    )


}
