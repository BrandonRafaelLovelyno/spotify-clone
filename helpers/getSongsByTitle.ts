"use server"

import { Database } from "@/types/database";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types/schema";

const supabaseServer = createServerComponentClient<Database>({
  cookies: cookies,
});

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const { data, error } = await supabaseServer
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`);
    if(error){
        throw new Error(`Failed on fetching the searched songs : ${error.message}`)
    }
    return (data as any)
};

export default getSongsByTitle;
