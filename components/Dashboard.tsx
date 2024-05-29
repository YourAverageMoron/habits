import { createClient } from "@/utils/supabase/server";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { cookies } from "next/headers";
import React from "react";
import DashboardSummary from "./DashboardSummary";
import DashboardCategories from "./DashboardCategories";


export default async function() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
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
                    <DashboardCategories tags={[]} />
                </TabPanel>
            </TabPanels>
        </TabGroup>



    </div>
}
