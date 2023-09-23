import { Database } from "@/types/database";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types/schema";

const supabaseServer=createServerComponentClient<Database>({
    cookies:cookies
})

const getSongsByUserID=async():Promise<Song[]>=>{
    const {
        data:sessionData,
        error:sessionError
    }=await supabaseServer.auth.getSession()

    if(sessionError||!sessionData.session){
        throw new Error("Cannot retrieve server session")
    }

    const user=sessionData.session.user;

    const {data,error}=await supabaseServer.from('songs').select('*').eq('user_id',user.id)

    return (data as any);

}

export default getSongsByUserID;
