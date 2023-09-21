import React from "react";

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface Props {
  icon: IconType;
  className?:string,
  onClick:(event:React.MouseEvent<HTMLButtonElement>)=>any,
}

const NavigationButton: React.FC<Props> = ({ icon: Icon ,className,onClick}) => {
  return (
    <button onClick={onClick} className={twMerge(`bg-black rounded-full p-2 hover:text-black hover:bg-white hover:opacity-75 duration-300`,className)}>
      <Icon size={20} />
    </button>
  );
};

export default NavigationButton;
