import { getUser, updateUser } from "@/lib/prisma/repositories/user.repository";
import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import PersonalInformationForm from "./personalInfoForm.component";

export default async function PersonalInformation() {
  const currentUser = await getUser();

  if (!currentUser) return <div>User not found</div>;

  const {id, ...userInfo} = currentUser

  return (
    <PageSection>
      <SectionTitle>Basic Information</SectionTitle>
      <PersonalInformationForm userInfo={userInfo} updateAction={updateUser}/>
    </PageSection>
  );
}
