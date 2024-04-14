import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {
    Card,
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
        <main className="min-h-screen flex justify-center bg-fuchsia-50">
            <Card className="max-w-screen-lg md:my-6 md:mx-6">
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
            </Card>
        </main >
    )
}
