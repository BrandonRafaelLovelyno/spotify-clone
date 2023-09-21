"use client";

import React, { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import SongLibrary from "./SongLibrary";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const Sidebar: React.FC<Props> = ({ className }) => {
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        href: "/",
        isActive: pathName !== "/search",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        isActive: pathName === "/search",
      },
    ],
    [pathName]
  );

  return (
    <div
      className={twMerge(
        `max-sm:hidden w-[200px] h-full flex flex-col overflow-y-auto text-sm text-neutral-400 mr-3`,
        className
      )}
    >
      <div className="flex flex-col gap-y-2 pl-5 py-5 bg-neutral-900 rounded-lg">
        {routes.map((route) => {
          return (
            <SidebarItem
              href={route.href}
              icon={route.icon}
              isActive={route.isActive}
              label={route.label}
              key={`${route.label} route`}
            />
          );
        })}
      </div>
      <div className="flex-1 bg-neutral-900 mt-3 rounded-lg">
        <SongLibrary />
      </div>
    </div>
  );
};

export default Sidebar;
