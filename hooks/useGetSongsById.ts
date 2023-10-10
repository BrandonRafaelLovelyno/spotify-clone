"use client"

import { Song } from "@/types/schema";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {useMemo,useState,useEffect} from 'react'
import toast from "react-hot-toast";

interface ReturnValue{
    isLoading:boolean;
    song?:Song;
}

const useGetSongById=(id?:number):ReturnValue=>{
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [song,setSong]=useState<Song|undefined>(undefined)
    const {supabaseClient}=useSessionContext()

    useEffect(()=>{

        if(!id){
            return
        }

        setIsLoading(true)
        const fetchSong=async():Promise<void>=>{
            const {data:song,error}=await supabaseClient.from('songs').select('*').eq('id',id).single()

            if(error){
                setIsLoading(false)
                toast.error(error.message)
                return
            }

            setIsLoading(false)
            setSong(song)
        }

        fetchSong()

    },[id]) 

    return useMemo(()=>({song,isLoading}),[song,isLoading])

}

export default useGetSongById