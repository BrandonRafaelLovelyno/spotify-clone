"use client";

import useLoadImage from "@/hooks/useImagePath";
import { Song } from "@/types/schema";
import Image from "next/image";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface Props {
  song: Song;
  imgClassName?: string;
  textClassName?: string;
  buttonOnClick?:()=>void;
}

const SongBook: React.FC<Props> = ({
  song,
  imgClassName,
  textClassName,
  buttonOnClick=()=>{},
}) => {
  const imageURL = useLoadImage(song);
  return (
    <div className="w-full bg-transparent duration-200 flex items-center gap-x-3 group mb-2 cursor-pointer" onClick={()=>{buttonOnClick()}}>
      <div
        className={twMerge(
          "h-fit aspect-square relative w-[40px] rounded-md overflow-hidden",
          imgClassName
        )}
      >
        <Image
          fill
          className="object-cover"
          alt={`${song.title}`}
          src={imageURL}
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className={twMerge("text-neutral-300 text-xs", textClassName)}>
          {song.title}
        </p>
        <p className={twMerge("text-neutral-300 text-xs", textClassName)}>
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default SongBook;
