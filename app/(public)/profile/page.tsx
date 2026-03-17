import { Metadata } from "next";
import { profilePageMetadata } from "@/static/metadata/metadata";
import PersonalInformation from "./personal-info/personal-info.component";
import SavedStories from "./saved-stories/savedStories.component";
import { ProfileContainer } from "./styles";

export const metadata : Metadata = profilePageMetadata
export const dynamic = "force-dynamic";


export default async function ProfilePage() {

  return (
      <ProfileContainer>
        <PersonalInformation />
        <hr />
        <SavedStories />
      </ProfileContainer>
  );
}
