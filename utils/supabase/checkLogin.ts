import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function isLoggedIn(supabase: SupabaseClient) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }
}
