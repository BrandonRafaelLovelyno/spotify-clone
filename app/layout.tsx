import "./globals.css";

import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
const figtree = Figtree({ subsets: ["latin"] });

import SupabaseProvider from "@/providers/SupabaseProvider";
import MyUserContextProvider from "@/providers/MyUserContextProvider";
import ToastProvider from "@/providers/ToastProvider";
import getSongsByUserID from "@/helpers/getSongsByUserID";

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Music website application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export const revalidate=0;

export default async function RootLayout({ children }: RootLayoutProps) {
  const librarySongs=await getSongsByUserID()
  return (
    <html lang="en">
      <body
        className={`${figtree.className} flex overflow-clip h-screen py-2 px-2 text-neutral-300 w-max-screen`}
      >
        <ToastProvider/>
        <SupabaseProvider>
          <MyUserContextProvider>
            <ModalProvider/>
            <Sidebar songs={librarySongs} />
            <div className="flex-1 flex flex-col h-full overflow-clip rounded-lg bg-neutral-900">
              {children}
            </div>
          </MyUserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
