import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Dashboard from '@/components/dashboard/Dashboard';
import { isLoggedIn } from '@/utils/supabase/checkLogin';
import Nav from '@/components/Nav';


export const revalidate = 0;

export default async function Index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await isLoggedIn(supabase)

    return (
        <main className="min-h-screen">
            <Nav />
            <div className='w-full'>
                <Dashboard />
            </div >

        </main >
    )
};


