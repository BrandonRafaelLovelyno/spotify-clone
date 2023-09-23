import { Database } from "@/types/database";
import { Song } from "@/types/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {toast} from 'react-hot-toast'

const supabaseClient=createClientComponentClient<Database>()

const useLoadImage=(song:Song) : string =>{
    const response=supabaseClient.storage.from('image').getPublicUrl(song.image_path)
    if(!response.data.publicUrl){
        toast.error("Cannot load songs images")
        throw new Error("Song Image URL cannot be found")
    }
    const imageURL=response.data.publicUrl;
    return imageURL;
}


export default useLoadImage