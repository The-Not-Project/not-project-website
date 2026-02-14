import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: #d4af37;
  color: black;
  padding: 2rem 100px 20px;

  @media (max-width: 850px) {
    padding: 50px 15px 20px 15px;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1300px;
  margin-inline: auto;

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
  font-family: var(--font-georgia), serif;
  font-size: 8rem;
  font-weight: normal;

  @media (max-width: 850px) {
    font-size: 4rem;
  }
`;

export const FooterContent = styled.section`
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 80px;
  @media (max-width: 850px) {
    gap: 50px;
    grid-template-columns: 1fr;
  }
`;

export const FooterSection = styled.div`
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
    font-family: var(--font-georgia), serif;
  }
`;

export const SectionTitle = styled.h3`
  font-weight: normal;
  font-family: var(--font-georgia), serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #00000036;
  padding-bottom: 16px;
  margin-bottom: 30px;
  @media (max-width: 850px) {
    margin-bottom: 20px;
  }
`;
