import React from "react";

import { CustUserContextProvider } from "@/hooks/useUser";

interface Props {
  children: React.ReactNode;
}

const MyUserContextProvider: React.FC<Props> = ({ children }) => {
  return <CustUserContextProvider>{children}</CustUserContextProvider>;
};

export default MyUserContextProvider;
