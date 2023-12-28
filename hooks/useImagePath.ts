import { Song } from "@/types/schema";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

const useLoadImage = (song: Song): string => {
  const { supabaseClient } = useSessionContext();
  const response = supabaseClient.storage
    .from("image")
    .getPublicUrl(song.image_path);
  if (!response.data.publicUrl) {
    toast.error("Cannot load songs images");
    throw new Error("Song Image URL cannot be found");
  }
  const imageURL = response.data.publicUrl;
  return imageURL;
};

export default useLoadImage;
