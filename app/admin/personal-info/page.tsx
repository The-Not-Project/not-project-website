import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import PersonalInformationForm from "./personalInfoForm.component";
import { getSession } from "@/lib/auth/actions/getSession";

export default async function PersonalInformation() {
  const { user } = await getSession();

  return (
    <PageSection>
      <SectionTitle>Basic Information</SectionTitle>
      <PersonalInformationForm user={user} />
    </PageSection>
  );
}
