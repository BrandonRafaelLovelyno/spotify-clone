"use client";

import useGetSongById from "@/hooks/useGetSongsById";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import { twMerge } from "tailwind-merge";
import PlayerContent from "./PlayerContent";
import useGetSongUrl from "@/hooks/useGetSongUrl";

const Player = () => {
  const player = usePlayer();
  const { song, isLoading } = useGetSongById(player.activeId);
  const songUrl=useGetSongUrl(song?.song_path)

  const isPlaying=song!==undefined

  return (
  <div className={twMerge('top-full duration-200 absolute left-0 right-0',isPlaying&&'-translate-y-full')}>
    {
      song!==undefined && <PlayerContent song={song} songUrl={songUrl} key={songUrl}/>
    }
    
  </div>);
};

export default Player;
