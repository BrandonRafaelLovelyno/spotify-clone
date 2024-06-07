"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import ConfirmationModal from "@/components/ConfirmationModal";

const ModalProvider = () => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  useEffect(() => {
    setIsDisplayed(true);
  }, []);

  if (!isDisplayed) {
    return null;
  }

  return (
    <>
      <ConfirmationModal />
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
