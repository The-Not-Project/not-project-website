import PersonalInfoForm from "./personalInfoForm.component";
import { getUserAction, updateUserAction } from "@/lib/internal-api/actions/user.actions";

export default async function PersonalInformation() {
  const { user: currentUser } = await getUserAction();

  if (!currentUser) return <div>User not found</div>;

  const {id, ...userInfo} = currentUser

  return <PersonalInfoForm userInfo={userInfo} updateAction={updateUserAction}/>;
}