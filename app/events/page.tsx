import Nav from "@/components/Nav";
import { isLoggedIn } from "@/utils/supabase/checkLogin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { EventsList } from "@/components/EventsList";


// TODO:
// DELETE and UPDATE buttons 
export default async function CreateEvent() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await isLoggedIn(supabase)

    let events = await supabase
        .from('events')
        .select(`
            id
            , start_time
            , end_time
            , timezone
            , intensity
            , journal
            , timezone
            , event_tags(
                id
                , event_tag_categories(id, name)
                , category_id
                , value
            )
            ,created_at
            ,updated_at`)
        .order('start_time', { ascending: false })
        .range(0, 10);


    if (!events.data) {
        console.log(events.error);
        redirect("/");
    }

    return (
        <>
            <Nav />
            <div className="m-10">
                <ol className="relative border-s border-tremor-border dark:border-dark-tremor-border">
                    <EventsList events={events.data} />
                </ol>
            </div>
        </>
    );
}
