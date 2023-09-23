"use client";

import useLoadImage from "@/hooks/useImagePath";
import { Song } from "@/types/schema";
import Image from "next/image";
import React from "react";
import {BsPlayFill} from 'react-icons/bs'

interface Props {
  song: Song;
}

const SongBook: React.FC<Props> = ({ song }) => {
  const imageURL = useLoadImage(song);
  return (
    <div className="w-full bg-transparent duration-200 flex items-center gap-x-3 group mb-2">
      <div className="h-fit aspect-square relative w-[40px] rounded-md overflow-hidden">
        <Image
          fill
          className="object-cover"
          alt={`${song.title}`}
          src={imageURL}
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-neutral-300 text-xs">{song.title}</p>
        <p className="text-neutral-300 text-xs">{song.author}</p>
      </div>
      {/* TODO: ADD THE PAUSE ICON WHEN PLAYIN */}
      <div className="ml-auto mr-2 text-green-500 scale-0 group-hover:scale-100 duration-300">
        <BsPlayFill size={25} />
      </div>
    </div>
  );
};

export default SongBook;
