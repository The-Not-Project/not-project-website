import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import PersonalInformationForm from "./personalInfoForm.component";
import { getUserAction, updateUserAction } from "@/lib/internal-api/actions/user.actions";

export default async function PersonalInformation() {
  const {user: currentUser} = await getUserAction();

  if (!currentUser) return <div>User not found</div>;

  const {id, ...userInfo} = currentUser

  return (
    <PageSection>
      <SectionTitle>Basic Information</SectionTitle>
      <PersonalInformationForm userInfo={userInfo} updateAction={updateUserAction}/>
    </PageSection>
  );
}
