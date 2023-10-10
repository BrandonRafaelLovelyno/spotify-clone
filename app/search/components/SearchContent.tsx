"use client"

import LikeButton from "@/components/LikeButton";
import SongBook from "@/components/SongBook";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types/schema";
import React from "react";

interface Props {
  songs: Song[];
}

export const revalidate=0

const SearchContent: React.FC<Props> = ({ songs }) => {
  const onPlay=useOnPlay(songs)
  if (songs.length === 0) {
    return (
      <div className="text-neutral-400 pt-5 flex items-center justify-center w-full h-full">
        No songs found
      </div>
    );
  }
  return (
    <div className="pt-5 flex flex-col gap-y-2">
      {songs.map((song:Song) => (
        <div className="flex flex-row hover:-translate-y-2 duration-150" key={song.id}>
          <SongBook song={song}  hidePlayButton={false} buttonOnClick={()=>{onPlay(song.id)}}/>
          <LikeButton song_id={song.id} />
        </div>
))}
    </div>
  );
};

export default SearchContent;
