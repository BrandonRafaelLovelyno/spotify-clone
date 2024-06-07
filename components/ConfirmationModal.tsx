"use client";

import React from "react";

import Modal from "./Modal";
import Input from "./Input";
import AuthButton from "./AuthButton";
import { twMerge } from "tailwind-merge";
import useConfirmationModal from "@/hooks/useConfirmation";

const ConfirmationModal = () => {
  const { isOpen, onClose, confirm } = useConfirmationModal();

  return (
    <Modal
      title="Warning"
      isOpen={isOpen}
      onOpenChange={onClose}
      description="Copyright infringement is a serious offense. Please make sure you have the rights to upload this song."
    >
      <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-x-3 gap-y-4">
        <AuthButton
          onClick={onClose}
          className={twMerge("bg-red-500 text-white")}
        >
          Cancel
        </AuthButton>
        <AuthButton onClick={confirm} className="font-bold bg-green-500">
          Confirm
        </AuthButton>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
