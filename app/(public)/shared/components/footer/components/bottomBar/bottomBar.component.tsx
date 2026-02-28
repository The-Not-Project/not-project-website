import { BottomBarContainer } from "./bottomBar.styles";
import Link from "next/link";

export default function BottomBar() {

  return (
    <BottomBarContainer>
      <p>2026 © The Not Project</p>
      <p><Link href="/privacy">Privacy Policy</Link></p>
    </BottomBarContainer>
  );
}
