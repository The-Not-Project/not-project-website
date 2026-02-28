import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: block;
  color: white;
  width: 100%;
  height: 40vh;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(
      ellipse 80vw 40vh at 50% 0%,
      rgba(13, 13, 13, 0.8) 5%,
      rgba(13, 13, 13, 0.6) 20%,
      transparent 70%
    );

    @media (max-width: 850px) {
      display: none;
    }
  }
`;

export const AboutUsContainer = styled.article`
  padding: 2rem;
  white-space: pre-wrap;
  color: #bdbdbd;

  h2 {
    font-family: var(--font-georgia), serif;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
  }

  @media (max-width: 850px) {
    padding: 20px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
    }

    div:nth-child(2) div:first-child {
      order: 2;
    }
  }
`;

export const AboutSection = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
  height: 500px;

  &.intro {
    height: auto;
    display: block;
    max-width: 61%;
  }

  @media (max-width: 1400px) {
    height: 400px;

    &.intro {
      max-width: none;
    }
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    height: auto;
    row-gap: 1.5rem;
    margin-block: 20px 40px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;

  @media (max-width: 850px) {
    padding: 0;
  }
`;

export const ImageContainer = styled.div`
  position: relative;

  img {
    object-fit: cover;
  }

  @media (max-width: 850px) {
    height: 250px;
  }
`;

export const CenteredSection = styled.div`
  margin: 2rem;
  height: 90vh;
  margin-top: 50px;
  background: url("/media/thePeople.png") no-repeat center center/cover;
  display: grid;
  place-items: center;

  @media (max-width: 850px) {
    margin: 2rem 0;
    height: 60vh;
  }
`;

export const CenteredSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #dadada;
  color: #0d0d0d;
  height: 50vh;
  width: 50vh;
  padding: 3rem;

  @media (max-width: 850px) {
    height: 90vw;
    width: 90%;
    padding: 1.3rem;
  }
`;
