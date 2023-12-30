import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import { getSongs } from "@/helpers/getSongs";
import { Song } from "@/types/schema";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs: Song[] = await getSongs();
  return (
    <main className="overflow-y-auto w-full h-full flex flex-col">
      <Header songs={songs}>
        <p className="text-xl font-bold mt-5">Welcome Back!</p>
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem
            href="/playlist/liked"
            image="/images/liked.png"
            text="Liked Song"
            key={`liked song button`}
          />
        </div>
      </Header>
      <div className="px-5 flex-1 pb-5">
        <div className="mt-3 mb-5">
          <p className="font-semibold text-white text-2xl">Newest songs</p>
          <p className="font-semibold text-neutral-400 text-md">
            List of the song
          </p>
        </div>
        <PageContent songs={songs} />
      </div>
    </main>
  );
}
