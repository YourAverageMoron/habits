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
import CreateEvent from '@/components/CreateEvent';
import Dashboard from '@/components/Dashboard';
import { redirect } from 'next/navigation';


export default async function Index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    let { data, error } = await supabase
        .from('event_tag_categories')
        .select('id, name, category_index')

    if (data) {
        return (
            <main className="min-h-screen flex justify-center bg-fuchsia-50">
                <Card className="max-w-screen-lg md:my-6 md:mx-6 relative">
                    <TabGroup className="h-full p-6">
                        <TabList>
                            <Tab>Dashboard</Tab>
                            <Tab>New Event</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Dashboard />
                            </TabPanel>
                            <TabPanel className="">
                                <CreateEvent tagsCategories={data} />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </Card>
            </main >
        )
    };
    return (
        <main className="min-h-screen flex justify-center bg-fuchsia-50">
            <Card className="max-w-screen-lg md:my-6 md:mx-6 relative">
            </Card>
        </main >

    )

}
