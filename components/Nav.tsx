import AuthButton from "./AuthButton";

type NavProps = {
    isSupabaseConnected:boolean;
}

    // const canInitSupabaseClient = () => {
    //     try {
    //         createClient(cookieStore)
    //         return true
    //     } catch (e) {
    //         return false
    //     }
    // }
    //



export default function Nav (props:NavProps){
    return <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16">
        <div className="w-full flex justify-end items-center text-sm">
            {props.isSupabaseConnected && <AuthButton />}
        </div>
    </nav>
}
