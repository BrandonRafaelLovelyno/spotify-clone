"use client"

import SongBook from '@/components/SongBook';
import { Song } from '@/types/schema'
import React from 'react'

interface Props{
    songs:Song[];
}

const SearchContent:React.FC<Props> = ({songs}) => {
  if(songs.length===0){
    return (
    <div className='text-neutral-400 pt-5 flex items-center justify-center w-full h-full'>
      No songs found
    </div>)
  }
  return (
    <div className='pt-5'>
      {songs.map(song=>(
        <SongBook
        song={song}
        key={song.id}
        />
      ))}
    </div>
  )
}

export default SearchContent
