import { getSession } from "@/lib/auth/actions/getSession";
import PersonalInfoForm from "./form.component";

export default async function PersonalInformation() {
  const {user} = await getSession()
  return <PersonalInfoForm user={user} />;
}