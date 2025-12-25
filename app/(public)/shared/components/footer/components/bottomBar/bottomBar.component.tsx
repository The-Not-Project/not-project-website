import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { BottomBarContainer, LegalLinks } from "./bottomBar.styles";
import PrivacyPolicy from "@/app/constants/privacyPolicy";
import TermsAndConditions from "@/app/constants/termsConditions";

export default function BottomBar({ isMobile }: { isMobile: boolean }) {
  const handleClick = (type: "privacy" | "terms") => {
    const content =
      type === "privacy"
        ? ReactDOMServer.renderToString(<PrivacyPolicy />)
        : ReactDOMServer.renderToString(<TermsAndConditions />);

    Swal.fire({
      title: type === "privacy" ? "Privacy Policy" : "Terms & Conditions",
      html: `<div style="max-height: 70vh; overflow-y: auto; text-align: left;">${content}</div>`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: true,
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  };

  return (
    <BottomBarContainer>
      {isMobile ? (
        <>
          <LegalLinks>
            <p onClick={() => handleClick("privacy")}>Privacy Policies</p>
            <p onClick={() => handleClick("terms")}>Terms & Conditions</p>
          </LegalLinks>
          <p>© The Not Project</p>
        </>
      ) : (
        <>
          <p>2025 © The Not Project</p>
          <p onClick={() => handleClick("privacy")}>Privacy Policy</p>
        </>
      )}
    </BottomBarContainer>
  );
}
