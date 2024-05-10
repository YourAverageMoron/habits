import { EventAccordionBody } from "@/components/EventAccordionBody";
import Nav from "@/components/Nav";
import { isLoggedIn } from "@/utils/supabase/checkLogin";
import { createClient } from "@/utils/supabase/server";
import { Accordion, AccordionBody, AccordionHeader, AccordionList, Badge } from "@tremor/react";
import {formatDistanceToNow } from "date-fns";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { EventAccordionBodyTags } from "@/components/EventAcordionBodyTags";


// TODO:
// PAGENTATE DATA PULL FROM SUPABASE -> CREATE AN INFINATE SCROLL
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
            , intesity
            , journal
            , timezone
            , event_tags(
                id
                ,event_tag_categories(id, name)
                ,category_id
                ,value
            )
            ,created_at`)
        .order('created_at', { ascending: false })
        .limit(1);


    if (!events.data) {
        console.log(events.error);
        redirect("/");
    }

    return (
        <>
            <Nav />
            <div className="m-10">
                <ol className="relative border-s border-tremor-border dark:border-dark-tremor-border">
                    {events.data.map((d) => (
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-tremor-background rounded-full -start-3 ring-8 ring-tremor-background dark:ring-dark-tremor-background dark:bg-dark-tremor-background">
                                <img className="rounded-full shadow-lg" src="/favicon.png" alt="Bonnie image" />
                            </span>
                            <AccordionList className="">

                                <Accordion defaultOpen={true}>
                                    <AccordionHeader className="text-xs font-medium text-tremor-content dark:text-dark-tremor-content">
                                        <time className="mb-1 text-xs font-normal text-tremor-content-subtle dark:text-dark-tremor-content-subtle sm:order-last sm:mb-0">
                                            Created {formatDistanceToNow(new Date(d.created_at))} ago
                                        </time>
                                    </AccordionHeader>
                                    <AccordionBody className="leading-6">
                                        <EventAccordionBody />
                                    </AccordionBody>
                                </Accordion>
                                <Accordion>
                                    <AccordionHeader className="text-xs font-medium text-tremor-content dark:text-dark-tremor-content">
                                        Tags
                                    </AccordionHeader>
                                    <AccordionBody className="leading-6">
                                        <EventAccordionBodyTags tags={d.event_tags} />
                                    </AccordionBody>
                                </Accordion>
                                <Accordion>
                                    <AccordionHeader className="text-xs font-medium text-tremor-content dark:text-dark-tremor-content">
                                        Journal
                                    </AccordionHeader>
                                    <AccordionBody className="leading-6">
                                        {d.journal}
                                    </AccordionBody>
                                </Accordion>
                            </AccordionList>

                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
