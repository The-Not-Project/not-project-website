import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { translate: 0 0; }
  to { translate: 0 -100%; }
`;

export const LoadingPageContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0d0d0d;
  animation: ${slideUp} 300ms ease 700ms forwards;
`;
