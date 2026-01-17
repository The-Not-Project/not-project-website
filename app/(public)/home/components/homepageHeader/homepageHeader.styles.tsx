import styled, { keyframes } from "styled-components";

export const HeaderContainer = styled.header`
  display: block;
  height: 100vh;
  max-height: 60vw;
  max-width: 100vw;
  overflow: hidden;
  color: white;
  position: relative;
  padding-top: 80px;

  @media (max-width: 850px) {
    max-height: none;
  }
`;

export const CenterTitle = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: min-content;
  text-shadow: 0 0 10px black;

  h1 {
    font-family: var(--font-georgia), sans-serif;
    font-size: 5.5vw;
    letter-spacing: 5px;
    transition: 0.3s;
  }
  
  h2 {
    font-weight: normal;
    font-size: 1vw;
    margin-bottom: 1vw;
    color: hsl(45.859872611464965, 30%, 52.352941176470594%);
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    margin-top: 1.1vw;
    font-size: 1vw;
    text-wrap: balance;
    color: #dedede;
  }

  @media (max-width: 1200px) {
    p {
      font-size: 1rem;
      margin-top: 10px;
    }
  }

  @media (max-width: 850px) {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 0.7rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 0.9rem;
    }

    div {
      height: 10px;
    }
  }
`;

export const SeperatorContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1181 / 41;
`;

export const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  translate: 0;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(13, 13, 13, 0.4),
      rgba(13, 13, 13, 0.6) 75%,
      rgba(13, 13, 13, 0.9) 95%,
      rgba(13, 13, 13, 1) 100%
    );
  }
`;

export const parallaxScroll = keyframes`
from {
  transform: translateY(0%);
}
to {
  transform: translateY(50vh);
}
`;

export const HeaderVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  will-change: transform;
`;
