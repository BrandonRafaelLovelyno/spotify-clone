"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { User, useSessionContext } from "@supabase/auth-helpers-react";
import { useUser as useSupaUser } from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/types/schema";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

interface Props {
  [propsName: string]: any;
}

export const UserContext = createContext<UserContextType | null>(null);

export const CustUserContextProvider: React.FC<Props> = (props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const getUserDetails = async () =>
    supabase.from("users").select("*").single();
  const getSubscription = async () =>
    supabase
      .from("subscriptons")
      .select("*,prices(*,products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingUser && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (result) => {
          const userDetailsPromise = result[0];
          const subscriptionPromise = result[1];
          if (userDetailsPromise.status == "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status == "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !userDetails && !subscription) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value: UserContextType = {
    accessToken,
    user,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
    userDetails,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("The user context is only available wihtin the provider");
  } else {
    return context;
  }
};
