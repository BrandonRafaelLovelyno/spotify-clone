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
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 backdrop-blur-lg" />
        <Dialog.Content
          className={twMerge(
            "duration-200 fixed h-fit max-h-[80%] overflow-y-auto bg-neutral-900 top-[50%] left-[50%] p-8 translate-x-[-50%] translate-y-[-50%] md:w-[450px] md:h-max-[85vh] w-[80%] focus:outline-none drop-shadow-lg rounded-lg"
          )}
        >
          <Dialog.Title className="mb-4 text-xl font-bold text-center">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-sm font-semibold text-center text-neutral-400">
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
