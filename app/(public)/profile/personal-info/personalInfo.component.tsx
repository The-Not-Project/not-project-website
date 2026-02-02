import { getUser, updateUser } from "@/app/database/repositories/user.repository";
import PersonalInfoForm from "./personalInfoForm.component";

export default async function PersonalInformation() {
  const currentUser = await getUser();

  if (!currentUser) return <div>User not found</div>;

  const {id, ...userInfo} = currentUser

  return <PersonalInfoForm userInfo={userInfo} updateAction={updateUser}/>;
}