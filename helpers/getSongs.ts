import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types/schema";

const supabaseServer = createServerComponentClient({
  cookies: cookies,
});

export const getSongs = async (): Promise<Song[]> => {
  const { data, error } = await supabaseServer
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
  }
  return (data as any) || [];
};
