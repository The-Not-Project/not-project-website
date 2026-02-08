import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  aspect-ratio: 21 / 9;
  height: auto;
  position: grid;
  place-items: center;

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
