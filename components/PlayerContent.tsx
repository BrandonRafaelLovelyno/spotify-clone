"use client";

import useSound from "use-sound";
import { Song } from "@/types/schema";
import React, { useEffect, useState } from "react";
import SongBook from "./SongBook";
import LikeButton from "./LikeButton";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { BsPauseFill, BsFillPlayFill } from "react-icons/bs";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
interface Props {
  songUrl: string;
  song: Song;
}

const PlayerContent: React.FC<Props> = ({ songUrl, song }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState<number[]>([1]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const MidIcon = isPlaying ? BsPauseFill : BsFillPlayFill;
  const VolumeIcon = volume.includes(0) ? HiSpeakerXMark : HiSpeakerWave;
  const onChange = (value: number[]) => {
    setVolume(value);
  };
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const index = player.ids.findIndex((id) => id === song.id);
    const nextSong = player.ids[index + 1];
    if (!nextSong) {
      player.onId(player.ids[0]);
    } else {
      player.onId(nextSong);
    }
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const index = player.ids.findIndex((id) => id === song.id);
    const nextSong = player.ids[index - 1];
    if (!nextSong) {
      player.onId(player.ids[0]);
    } else {
      player.onId(nextSong);
    }
  };

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    play();

    return () => {
      sound?.unload();
    };
  }, [sound, play]);

  return (
    <div className="flex bg-black w-full h-fit py-4 items-center px-5">
      <div className="flex-1">
        <div className="flex w-fit items-center gap-x-5">
          <SongBook song={song} />
          <LikeButton song_id={song.id} />
        </div>
      </div>
      <div className="flex flex-1 justify-center gap-x-3">
        <div
          className="text-neutral-300 rounded-full p-2 hover:text-white duration-200 max-md:hidden"
          onClick={onPlayPrevious}
        >
          <AiOutlineStepBackward size={27} />
        </div>
        <div
          className="text-black bg-white rounded-full p-2 hover:scale-110 duration-200"
          onClick={handlePlay}
        >
          <MidIcon size={27} />
        </div>
        <div
          className="text-neutral-300 rounded-full p-2 hover:text-white duration-200"
          onClick={onPlayNext}
        >
          <AiOutlineStepForward size={27} />
        </div>
      </div>
      <div className="flex flex-1 gap-x-3 max-md:hidden justify-end items-center">
        <VolumeIcon size={27} />
        <Slider onChange={onChange} value={volume} />
      </div>
    </div>
  );
};

export default PlayerContent;
