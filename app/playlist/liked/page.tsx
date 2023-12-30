import Header from "@/components/Header";
import LikeButton from "@/components/LikeButton";
import SongBook from "@/components/SongBook";
import getLikedSongs from "@/helpers/getLikedSongs";
import { Song } from "@/types/schema";
import Image from "next/image";
import React from "react";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const LikedPage: React.FC = async () => {
  const songs = await getLikedSongs();
  return (
    <main className="h-full flex flex-col w-full overflow-y-auto pb-5">
      <Header songs={songs}>
        <div className="flex md:flex-row gap-x-5 mt-20 flex-col items-center max-md:gap-y-5">
          <div className="h-28 w-28 md:h-44 md:w-44 relative">
            <Image alt="liked_songs" fill={true} src="/images/liked.png" />
          </div>
          <div className="flex flex-col gap-y-5 justify-center">
            <p className="hidden md:block font-semibold text-lg">Playlist</p>
            <p className="block font-bold text-2xl md:text-4xl">Liked Songs</p>
          </div>
        </div>
      </Header>
      <div className="mt-10 px-5 pl-5 flex flex-col overflow-y-auto">
        <LikedContent songs={songs} />
      </div>
    </main>
  );
};

export default LikedPage;
