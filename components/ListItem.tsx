"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import Image from "next/image";
import {BsPlayFill} from "react-icons/bs"

interface Props {
  href: string;
  image: string;
  text: string;
  className?: string;
}

const ListItem: React.FC<Props> = ({ href, image, text, className }) => {
  const router = useRouter();
  const onClick = () => {
    //Do some auth here
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className={twMerge(`rounded-lg py-2 inline-flex flex-row relative w-full group`, className)}
    >
      <div className="h-[60px] w-[80px] bg-black relative">
        <Image alt={`${text} item`} src={image} layout="fill" objectFit="cover"/>
      </div>
      <div className="w-full bg-neutral-300 bg-opacity-20 text-start h-full  rounded-r-lg flex items-center pr-4 group-hover:bg-neutral-40 duration-300 group-hover:bg-opacity-30">
        <p className="text-sm lg:text-base ml-5 font-semibold">{text}</p>
        <div className="ml-auto duration-300 group-hover:text-black group-hover:bg-green-500 opacity-0 group-hover:opacity-80 rounded-full p-2 hover:scale-110">
          <BsPlayFill size={25} />
        </div>
      </div>
    </button>
  );
};

export default ListItem;
