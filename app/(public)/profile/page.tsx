import { Metadata } from "next";
import { profilePageMetadata } from "@/app/constants/metadata";
import { auth0 } from "@/lib/auth0";
import PersonalInformation from "./personal-info/personal-info.component";
import SavedStories from "./saved-stories/savedStories.component";
import { ProfileContainer } from "./styles";
import { redirect } from "next/navigation";

export const metadata : Metadata = profilePageMetadata


export default async function ProfilePage() {
  const session = await auth0.getSession()

  if ( !session || !session.user) redirect('/auth/login')

  return (
      <ProfileContainer>
        <PersonalInformation />
        <hr />
        <SavedStories />
      </ProfileContainer>
  );
}
