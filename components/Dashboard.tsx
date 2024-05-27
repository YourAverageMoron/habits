import { createClient } from "@/utils/supabase/server";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { cookies } from "next/headers";
import React from "react";
import DashboardSummary from "./DashboardSummary";





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
                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                        Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                </TabPanel>
            </TabPanels>
        </TabGroup>



    </div>
}
