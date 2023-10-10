"use client"

import { Song } from "@/types/schema"
import useAuthModal from "./useAuthModal"
import usePlayer from "./usePlayer"
import { useUser } from "./useUser"
import toast from "react-hot-toast"

const useOnPlay=(songs:Song[])=>{
    const authModal=useAuthModal()
    const player=usePlayer()
    const userContext=useUser()

    const onPlay=(song_id:number)=>{
        if(!userContext?.user){
            toast.error("Login to play song")
            return authModal.onOpen()
        }

        player.onId(song_id)
        player.onIds(songs.map((s:Song)=>s.id))
    }

    return onPlay
}

export default useOnPlay