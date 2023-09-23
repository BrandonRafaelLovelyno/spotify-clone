"use client"

import React from 'react'

import { Song } from '@/types/schema';
import SongCard from '../../../components/SongCard';

interface Props{
    songs:Song[];
}

const PageContent:React.FC<Props> = ({songs}) => {
    const onPlay=(id:string)=>{}
    if(songs.length==0){
        return <div>
            No songs available
        </div>
    }

  return (
    <div className='grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {songs.map(song=>(
            <SongCard song={song} key={song.id} onClick={onPlay}/>
        ))}
    </div>
  )
}

export default PageContent
