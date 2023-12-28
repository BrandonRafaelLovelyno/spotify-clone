"use client";

import LikeButton from "@/components/LikeButton";
import SongBook from "@/components/SongBook";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types/schema";
import React from "react";

interface Props {
  songs: Song[];
}

const LikedContent: React.FC<Props> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <p className="text-neutral-500 text-center">You have not liked a song</p>
    );
  }
  return songs.map((song: Song) => (
    <div key={song.id} className="pt-2 flex flex-row items-center">
      <SongBook
        song={song}
        imgClassName="w-[70px]"
        textClassName="text-md font-bold ml-5"
        buttonOnClick={() => {
          onPlay(song.id);
        }}
      />
      <LikeButton song_id={song.id} />
    </div>
  ));
};

export default LikedContent;
