"use client";

import useLoadImage from "@/hooks/useImagePath";
import { Song } from "@/types/schema";
import Image from "next/image";
import React from "react";
import { BsPlayFill } from "react-icons/bs";

interface Props {
  song: Song;
  onClick:(id:string)=>void;
}

const SongCard: React.FC<Props> = ({ song , onClick}) => {
  const imageURL = useLoadImage(song);
  return (
    <button onClick={()=>{onClick(song.id)}}>
      <div className="group bg-neutral-800 h-fit w-full group p-5 hover:bg-neutral-700 duration-300 hover:-translate-y-1 rounded-lg flex flex-col gap-y-2">
        <div className="h-fit w-full aspect-square rounded-lg overflow-hidden relative">
          <Image
            src={imageURL}
            alt={`${song.title}`}
            fill
            className="object-cover"
          />
          <div className="absolute right-[8%] bottom-[2%] text-black scale-0 group-hover:scale-100 duration-300 rounded-full overflow-hidden bg-green-500 p-1">
            <BsPlayFill size={30} />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-white font-semibold">{song.title}</p>
          <p className="text-xs">{song.author}</p>
        </div>  
      </div>
    </button>
  );
};

export default SongCard;
