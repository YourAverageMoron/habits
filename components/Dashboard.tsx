import { createClient } from "@/utils/supabase/server";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { cookies } from "next/headers";
import React from "react";
import DashboardSummary from "./DashboardSummary";
import DashboardCategories from "./DashboardCategories";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";


async function getCategories(client: SupabaseClient<Database>) {
    const { data, error } = await client.from("event_tag_categories")
        .select("id, name")

    if (error || !data) {
        return []
    }
    return data;
}


export default async function() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const categories = await getCategories(supabase);
    return <div className="sm:px-0.5 md:px-6 mt-6">
        <TabGroup className="w-full">
            <TabList variant="line" defaultValue="1">
                <Tab value="1">Summary</Tab>
                <Tab value="2">Categories</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <DashboardSummary client={supabase} tags={[]} />
                </TabPanel>
                <TabPanel>
                    <DashboardCategories categories={categories} />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
}
