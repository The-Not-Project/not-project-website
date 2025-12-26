"use client";

import clsx from "clsx";
import { useUser } from "@auth0/nextjs-auth0/client";
import PersonalInformation from "./personal-info/personalInfo.component";
import SavedStories from "./saved-stories/savedStories.component";
import { ProfileContainer, Wrapper } from "./styles";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useStore } from "@/app/zustand/store";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const setIsMobile = useStore((state) => state.mobileLayout.setIsMobile);
  const isMenuOpen = useStore((state) => state.mobileLayout.isMenuOpen);

  useEffect(() => {
    if (!isLoading && (!user || !user.sub)) {
      redirect("/");
    }

    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user || !user.sub) return null;

  return (
    <Wrapper className={clsx("page-wrapper", { shifted: isMenuOpen })}>
      <ProfileContainer>
        <PersonalInformation userId={user.sub} />
        <hr />
        <SavedStories userId={user.sub} />
      </ProfileContainer>
    </Wrapper>
  );
}
