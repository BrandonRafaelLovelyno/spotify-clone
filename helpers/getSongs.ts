import { cookies } from "next/headers";
import { Database } from "@/types/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types/schema";

const supabaseServer=createServerComponentClient<Database>({
    cookies:cookies
})

export const getSongs=async():Promise<Song[]> =>{
    const {
        data,
        error
    }=await supabaseServer.from('songs').select('*').order('created_at',{ascending:false})
    if(error){
        console.log("Error on fetching song :",error)
    }
    return (data as any) || []
}
