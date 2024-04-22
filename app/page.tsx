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
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';


async function createEventCategories(supabase: SupabaseClient<Database>) {
    let categories = await supabase
        .from('event_tag_categories')
        .select('id, name, category_index');

    if (!categories.data || categories.error) {
        //TODO throw an error or something 
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


export default async function Index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const data = await createEventCategories(supabase);

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
                                <CreateEvent categories={data} />
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
