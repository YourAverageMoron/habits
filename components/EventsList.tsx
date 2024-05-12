"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionList } from "@tremor/react";
import { EventAccordionBody } from "./EventAccordionBody";
import { EventAccordionBodyTags } from "./EventAcordionBodyTags";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";


type EventsListProps = {
    events: {
        id: number;
        start_time: string;
        end_time: string;
        timezone: string;
        intensity: number;
        journal: string | null;
        event_tags: {
            id: number;
            event_tag_categories: {
                id: number;
                name: string;
            } | null;
            category_id: number;
            value: string;
        }[];
        created_at: string;
        updated_at: string;
    }[]

}

export function EventsList(props: EventsListProps) {
    const supabase = createClient();
    const [isReadyToLoad, setIsReadyToLoad] = useState(true);
    const [events, setEvents] = useState(props.events);
    const [page, setPage] = useState(1);


    const fetchEvents = async () => {
        // TODO: REFACTOR THIS IN THE FUTURE
        //  SHOULD WE PULL THE INTITIAL STATE USING SSR?
        //  WE SHOULD HAVE PAGE SIZE AS A CONSTANT
        setIsReadyToLoad(false);
        let newEvents = await supabase
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
            .range((10 * page) + 1, 10 * (page + 1));
        if (!newEvents.data || newEvents.data.length > 0) {
            // TODO: HANDLE THIS ERROR PROPERLY
            console.log(newEvents.error);
            return;
        }
        setPage(page + 1)
        setEvents([...events, ...newEvents.data]);
        // TODO: IF THE LENGTH IS LESS THAN THE PAGE SIZE THEN DONT PULL ANY MORE
        setIsReadyToLoad(true);
        return;
    }

    const handleScroll = () => {
        const scrollPercentage = 0.8;
        const currentScroll = window.innerHeight + document.documentElement.scrollTop;
        if (currentScroll < (document.documentElement.offsetHeight * scrollPercentage) || !isReadyToLoad) {
            return;
        }
        fetchEvents();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isReadyToLoad]);

    const updateEvent = (id: number) => {
        //FIXME: THIS SHOULD ROUTE TO A PAGE LIKE CREATE EVENT THAT IS POPULATED
        alert("this hasn't been implemented yet sorry");
    }
    const deleteEvent = async (id: number) => {
        const { error: eventsError } = await supabase
            .from('events')
            .delete()
            .eq('id', id);
        if (eventsError) {
            alert("WARNING: an error occured, unable to delete event");
            return;
        }
        setEvents(events.filter((e) => e.id != id));
        alert("event deleted")
    }

    return (
        <>
            {events.map((d) => (
                <li key={`event-element-${d.id}`} className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-tremor-background rounded-full -start-3 ring-8 ring-tremor-background dark:ring-dark-tremor-background dark:bg-dark-tremor-background">
                        <img className="rounded-full shadow-lg" src="/favicon.png" alt="Bonnie image" />
                    </span>
                    <AccordionList className="">

                        <Accordion defaultOpen={true}>
                            <AccordionHeader className="text-xs font-medium text-tremor-content dark:text-dark-tremor-content">
                                <time className="mb-1 text-xs font-normal text-tremor-content-subtle dark:text-dark-tremor-content-subtle sm:order-last sm:mb-0">
                                    {d.created_at === d.updated_at ? "Created" : "Updated"} {formatDistanceToNow(new Date(d.updated_at))} ago
                                </time>
                            </AccordionHeader>
                            <AccordionBody className="leading-6">
                                <EventAccordionBody deleteEvent={deleteEvent} updateEvent={updateEvent} eventId={d.id} timezone={d.timezone} intensity={d.intensity} startTime={new Date(d.start_time)} endTime={new Date(d.end_time)} />
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
            ))
            }

        </>)

}
