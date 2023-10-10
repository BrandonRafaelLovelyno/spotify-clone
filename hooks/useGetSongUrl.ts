import { useSessionContext } from "@supabase/auth-helpers-react"

const useGetSongUrl=(songPath?:string):string=>{
    if(!songPath){
        return ""
    }
    const {supabaseClient}=useSessionContext()
    const {data:songData}= supabaseClient.storage.from('song').getPublicUrl(songPath)
    return songData.publicUrl
}

export default useGetSongUrl