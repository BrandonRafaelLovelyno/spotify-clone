import "./globals.css";

import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
const figtree = Figtree({ subsets: ["latin"] });

import SupabaseProvider from "@/providers/SupabaseProvider";
import MyUserContextProvider from "@/providers/MyUserContextProvider";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Music website application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} flex overflow-clip h-screen py-2 px-2 text-neutral-300`}
      >
        <ToastProvider/>
        <SupabaseProvider>
          <MyUserContextProvider>
            <ModalProvider/>
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-clip rounded-lg bg-neutral-900">
              {children}
            </div>
          </MyUserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
