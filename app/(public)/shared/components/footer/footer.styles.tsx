import styled from "styled-components";

export const FooterContainer = styled.footer`
  height: 100vh;
  background-color: #d4af37;
  color: black;
  width: 100%;
  position: relative;
  padding: 150px 5%;
  margin: 0 auto;

  h1, section, hr, aside {
    max-width: 1300px;
    margin-inline: auto;
  }
  @media (max-width: 850px) {
    padding: 50px 30px 20px 30px;
    height: auto;
  }

  hr {
    border: none;
    background: #00000036;
    height: 1px;
    margin-block: 35px;
    @media (max-width: 850px) {
      margin-block: 25px;
    }
  }
`;

export const Headline = styled.h1`
  font-family: "GeorgiaWeb", serif;
  font-size: 8rem;
  font-weight: normal;

  @media (max-width: 850px) {
    font-size: 4rem;
  }
`;

export const FooterContent = styled.section`
  padding-top: 10px;
  display: flex;
  gap: 80px;
  @media (max-width: 850px) {
    flex-direction: column;
    gap: 50px;
  }
`;

export const FooterSection = styled.div`
  flex-grow: 1;
  width: 33%;
  font-size: 1.2rem;

  @media (max-width: 850px) {
    width: 100%;
  }

  a {
    margin-block: 8px;
    color: black;
    display: block;

    &.no-underline {
      text-decoration: none;
    }
  }

  .bold {
    font-size: 1.3rem;
    font-family: "GeorgiaWeb", serif;
  }
`;

export const SectionTitle = styled.h3`
  font-weight: normal;
  font-family: "GeorgiaWeb", serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #00000036;
  padding-bottom: 16px;
  margin-bottom: 50px;
  @media (max-width: 850px) {
    margin-bottom: 20px;
  }
`;
