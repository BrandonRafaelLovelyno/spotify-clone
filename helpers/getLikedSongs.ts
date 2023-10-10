import { Song } from "@/types/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs= async():Promise<Song[]>=>{
    const supabaseServer=createServerComponentClient({
        cookies:cookies
    })

    const {data}=await supabaseServer.auth.getSession()

    if(!data.session?.user){
        return []
    }

    const {data:queries,error}=await supabaseServer.from('liked_songs').select('*,songs(*)').eq('user_id',data.session.user.id)
    
    if(!queries)return []

    return queries?.map((item)=>({
        ...item.songs
    }))

}

export default getLikedSongs