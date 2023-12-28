"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<Props> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
