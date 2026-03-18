import Link from "next/link";
import { Notice } from "./legal-notice.styles";

export default function LegalNotice() {
  return (
    <Notice>
      By clicking on sign in, you agree to our{" "}
      <Link href="/terms">Terms of Service</Link> and{" "}
      <Link href="/privacy">Privacy Policy</Link>
    </Notice>
  );
}
