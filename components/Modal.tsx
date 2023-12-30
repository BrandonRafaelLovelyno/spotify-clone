"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  children,
  description,
  title,
}) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} defaultOpen={isOpen} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black inset-0 opacity-50 fixed backdrop-blur-lg" />
        <Dialog.Content
          className={twMerge(
            "duration-200 fixed h-[80%] overflow-y-auto bg-neutral-900 top-[50%] left-[50%] p-8 translate-x-[-50%] translate-y-[-50%] md:w-[450px] md:h-max-[85vh] w-[80%] focus:outline-none drop-shadow-lg rounded-lg"
          )}
        >
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-center mb-5 text-neutral-400 font-semibold">
            {description}
          </Dialog.Description>
          <div className="pt-8">{children}</div>
          <Dialog.Close className="absolute top-[10px] right-[10px] focus:outline-none">
            <button className="duration-200 hover:scale-110 hover:text-white focus:outline-none">
              <AiOutlineClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
