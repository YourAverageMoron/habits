import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Dashboard from '@/components/Dashboard';
import { isLoggedIn } from '@/utils/supabase/checkLogin';
import Nav from '@/components/Nav';




export default async function Index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await isLoggedIn(supabase)

    // TODO: We can probably move the dashboard up to this level
    return (
        <main className="min-h-screen">
            <Nav/>
            <div className='w-full'>
                <Dashboard />
            </div >

        </main >
    )
};


