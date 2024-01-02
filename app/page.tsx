import DeployButton from '../components/DeployButton'
import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {
    Card,
    Grid,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from "@tremor/react";


export default async function Index() {
    const cookieStore = cookies()

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient(cookieStore)
            return true
        } catch (e) {
            return false
        }
    }

    const isSupabaseConnected = canInitSupabaseClient()

    return (
        <main>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <DeployButton />
                    {isSupabaseConnected && <AuthButton />}
                </div>
            </nav>
            <TabGroup className="p-12">
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Detail</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                            <Card>
                                {/* Placeholder to set height */}
                                <div className="h-28" />
                            </Card>
                            <Card>
                                {/* Placeholder to set height */}
                                <div className="h-28" />
                            </Card>
                            <Card>
                                {/* Placeholder to set height */}
                                <div className="h-28" />
                            </Card>
                        </Grid>
                        <div className="mt-6">
                            <Card>
                                <div className="h-80" />
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <div className="h-96" />
                            </Card>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>

        </main >
    )
}
