"use client";

import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { IconType } from "react-icons";

interface Props {
  label: string;
  href: string;
  isActive: boolean;
  icon: IconType;
}

const SidebarItem = ({ label, href, isActive, icon:Icon }: Props) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex gap-x-5 w-full font-semibold hover:text-white duration-300 items-center",
        isActive && "text-white"
      )}
    >
      <Icon size={20}/>
      <p>{label}</p>
    </Link>
  );
};


export default SidebarItem;
