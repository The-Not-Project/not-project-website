import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { BottomBarContainer } from "./bottomBar.styles";
import PrivacyPolicy from "@/app/constants/privacyPolicy";

export default function BottomBar() {
  const handleClick = () => {
    const content = ReactDOMServer.renderToString(<PrivacyPolicy />)

    Swal.fire({
      title: "Privacy Policy",
      html: content,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: true,
      customClass: {
        popup: "privacy-popup",
      },
    });
  };

  return (
    <BottomBarContainer>
      <p>2025 © The Not Project</p>
      <p onClick={() => handleClick()}>Privacy Policy</p>
    </BottomBarContainer>
  );
}
