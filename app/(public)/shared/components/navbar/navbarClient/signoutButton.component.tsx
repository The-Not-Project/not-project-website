'use client'

import React from "react";
import { AuthContainer, AuthLink } from "../navbar.styles";
import { authClient } from "@/lib/auth";

type ButtonProps = {
  authenticated: boolean;
  isMobile: boolean;
};

export default function SignOutButton({
  authenticated,
  isMobile,
}: ButtonProps) {
  
  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!authenticated) return;

    e.preventDefault();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <AuthContainer className={isMobile ? "" : "desktop"}>
      <AuthLink
        href={authenticated ? "#" : "/signin"}
        onClick={handleSignOut}
      >
        {authenticated ? "Sign Out" : "Sign In"}
      </AuthLink>
    </AuthContainer>
  );
}