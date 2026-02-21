import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  aspect-ratio: 21 / 9;
  height: auto;

  &:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse 100% 100% at 100% 0%, 
    rgba(13, 13, 13, 0.8) 5%, 
    rgba(13, 13, 13, 0.6) 25%, 
    transparent 60%
  );
  z-index: 1;
}

  @media (max-width: 850px) {
    aspect-ratio: 3 / 4;
  }
`;

export const HeaderText = styled.h1`
  font-family: var(--font-georgia);
  font-weight: normal;
  font-size: 2.5rem;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  @media (max-width: 8500px) {
    font-size: 2rem;
    text-wrap: balance;
    text-align: center;
    width: 70%;
  }
`;
