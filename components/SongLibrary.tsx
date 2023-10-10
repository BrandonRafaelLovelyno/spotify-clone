"use client"

import React from "react";

import { TbPlaylist } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useLibraryModal from "@/hooks/useLibraryModal";
import { Song } from "@/types/schema";
import SongBook from "./SongBook";
import useOnPlay from "@/hooks/useOnPlay";

interface Props{
  songs:Song[];
}

const SongLibrary:React.FC<Props> = ({songs}) => {
  const onPlay=useOnPlay(songs)
  const userContext=useUser()
  const authModal = useAuthModal()
  const libraryModal=useLibraryModal()
  const onClick = () => {
    if(userContext?.user===null){
      return authModal.onOpen()
    }
    libraryModal.onOpen()
  };

  return (
    <div className="flex flex-col mt-3 pl-5">
      <div className="flex flex-row justify-between pr-5 hover:text-white duration-300">
        <div className="flex flex-row gap-x-2 cursor-pointer ">
          <TbPlaylist size={20} />
          <p>Your library</p>
        </div>
        <div onClick={onClick} className="cursor-pointer ">
          <IoIosAdd size={20} />
        </div>
      </div>
        <div>
            <p className="text-white font-bold mt-4 mb-5">List of songs!</p>
            {
             songs.length>0&&songs.map(song=>(
                <SongBook song={song} key={song.id} buttonOnClick={()=>{onPlay(song.id)}}/>
              ))
            }
        </div>
    </div>
  );
};

export default SongLibrary;
