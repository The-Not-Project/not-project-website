"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import PersonalInformation from "./personal-info/personalInfo.component";
import SavedStories from "./saved-stories/savedStories.component";
import { ProfileContainer, ProfileWrapper } from "./styles";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || !user.sub)) {
      redirect("/");
    }

  }, [user, isLoading]);

  if (isLoading || !user || !user.sub) return null;

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <PersonalInformation userId={user.sub} />
        <hr />
        <SavedStories userId={user.sub} />
      </ProfileContainer>
    </ProfileWrapper>
  );
}
