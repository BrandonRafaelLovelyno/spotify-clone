"use client";

import React, { useEffect, useState } from "react";

import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Database } from "@/types/database";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import toast from "react-hot-toast";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";

interface Props {
  song_id: number;
}

const uploadIsLiked = async (
  isLiked: boolean,
  supabaseClient: SupabaseClient<Database>,
  song_id: number,
  user_id: string,
  router: any
): Promise<void> => {
  if (isLiked) {
    const { data, error } = await supabaseClient
      .from("liked_songs")
      .delete()
      .eq("song_id", song_id)
      .eq("user_id", user_id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Song unliked");
  } else {
    const { data, error } = await supabaseClient.from("liked_songs").insert({
      song_id,
      user_id,
    });
    if (error) {
      console.log(error.message);
      toast.error("Uh oh, failed to like song");
      return;
    }
    toast.success("Song liked");
  }
  router.refresh();
};

const fetchIsLiked = async (
  supabaseClient: SupabaseClient<Database>,
  song_id: number,
  user_id: string
): Promise<boolean> => {
  const { data: isLiked, error: dbError } = await supabaseClient
    .from("liked_songs")
    .select("*")
    .eq("song_id", song_id)
    .eq("user_id", user_id);

  if (isLiked == null || isLiked.length == 0) {
    return false;
  } else {
    return true;
  }
};

const LikeButton: React.FC<Props> = ({ song_id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();
  const userContext = useUser();
  const supabaseClient = createClientComponentClient<Database>();
  const { onOpen } = useAuthModal();
  const Icon: IconType = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!userContext?.user) {
      return onOpen();
    }
    fetchIsLiked(supabaseClient, song_id, userContext.user.id)
      .then((dbLiked) => setIsLiked(dbLiked))
      .catch((err) => toast.error("Uh oh, failed to fetch liked_song"));
  }, [userContext, onOpen, song_id, supabaseClient]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (ev) => {
    setIsLiked(!isLiked);
    if (!userContext?.user?.id) {
      return onOpen();
    }
    await uploadIsLiked(
      isLiked,
      supabaseClient,
      song_id,
      userContext?.user?.id,
      router
    );
  };

  return (
    <div>
      <button onClick={onClick} className="text-green-500">
        <Icon size={25} />
      </button>
    </div>
  );
};

export default LikeButton;
