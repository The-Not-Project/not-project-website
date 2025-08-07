"use client";

import { ReactNode, useEffect } from "react";
import { PopupContainer, Popup as StyledPopup } from "./popup.styles";

export default function Popup({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = ""; // cleanup on unmount
    };
  }, []);
  return (
    <PopupContainer onClick={onClose}>
      <StyledPopup onClick={(e) => e.stopPropagation()}>{children}</StyledPopup>
    </PopupContainer>
  );
}
