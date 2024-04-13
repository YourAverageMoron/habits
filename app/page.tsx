import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from "@tremor/react";
import EventDateTime from '@/components/CreateEvent';
import Dashboard from '@/components/Dashboard';
import { redirect } from 'next/navigation';


export default async function Index() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main>
            <TabGroup className="p-6">
                <TabList>
                    <Tab>Dashboard</Tab>
                    <Tab>New Event</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Dashboard />
                    </TabPanel>
                    <TabPanel>
                        <EventDateTime />
                    </TabPanel>
                </TabPanels>
            </TabGroup>

        </main >
    )
}
