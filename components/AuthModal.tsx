"use client";

import React, { useEffect } from "react";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { onClose, isOpen } = useAuthModal();
  const { session } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      router.refresh();
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      onClose();
    }
  }, [session, onClose]);

  return (
    <Modal
      title="Welcome Back !"
      description="Please login to your account"
      isOpen={isOpen}
      onOpenChange={onChange}
    >
      <Auth
        providers={["github", "discord"]}
        theme="dark"
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
