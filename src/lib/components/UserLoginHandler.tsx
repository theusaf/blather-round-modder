"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode, useEffect } from "react";
import { UserLogin } from "../types/session";
import { useUserStore } from "../hooks/userStore";

export default function UserLoginHandler({
  loginDetails,
  children,
}: {
  loginDetails: UserLogin;
  children: ReactNode;
}) {
  useEffect(() => {
    const setUser = useUserStore.getState().setUser;
    setUser(loginDetails);
  }, [loginDetails]);
  return (
    <>
      <ProgressBar
        options={{
          showSpinner: false,
        }}
      />
      {children}
    </>
  );
}
