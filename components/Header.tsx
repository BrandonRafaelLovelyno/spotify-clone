"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import NavigationButton from "./NavigationButton";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from 'react-hot-toast'

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Header: React.FC<Props> = ({ className, children }) => {
  const {supabaseClient}=useSessionContext()
  const { onOpen } = useAuthModal();
  const router = useRouter();
  const backRoute = () => {
    router.back();
  };
  const forwardRoute = () => {
    router.forward();
  };
  const handleSignOut=async ()=>{
    const {error}=await supabaseClient.auth.signOut()
    if(error){
      toast.error("Failed to log out")
    }else{
      toast.success("You have logged out")
    }
  }
  const userContext = useUser();
  return (
    <div
      className={twMerge(
        "h-fit py-5 px-5 from-emerald-800 bg-gradient-to-b justify-between",
        className
      )}
    >
      <div className="text-white items-center justify-between flex flex-row">
        <div className="flex flex-row gap-x-3 md:hidden ">
          <NavigationButton onClick={backRoute} icon={IoChevronBackOutline} />
          <NavigationButton
            onClick={forwardRoute}
            icon={IoChevronForwardOutline}
          />
        </div>
        {userContext?.user ? (
          <div className="ml-auto">
            <AuthButton disabled={false} onClick={handleSignOut}>
              Log out
            </AuthButton>
          </div>
        ) : (
          <div className="flex flex-row gap-x-2 ml-auto">
            <AuthButton disabled={true} onClick={onOpen}>
              Sign up
            </AuthButton>
            <AuthButton disabled={false} onClick={onOpen}>
              Login
            </AuthButton>
          </div>
        )}
      </div>
      <div className="mt-5">
      {children}
      </div>
    </div>
  );
};

export default Header;
