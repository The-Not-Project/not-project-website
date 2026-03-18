import { googleSignInAction } from "@/lib/auth/actions/googleSignIn";
import { FaGoogle } from "react-icons/fa6";
import { SocialsHeader } from "../../../styles";

export default function SocialSignIn() {
  return (
    <>
      <SocialsHeader>
        <hr />
        <p>Or continue with</p>
      </SocialsHeader>

      <button type="button" onClick={googleSignInAction}>
        <FaGoogle />
        Google
      </button>
    </>
  );
}
