import styled from "styled-components";

export const Wrapper = styled.main`
  background: #e7e0d6;
  padding: 40px;
`;

export const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  hr {
    margin-block: 50px 40px;
    margin-inline: 40px;
    border: #ccc 1px solid;
  }

  @media (max-width: 850px) {
    margin-top: 0;

    hr {
      margin-block: 40px 10px;
      margin-inline: 10px;
    }
  }
`;

export const PageSection = styled.section`
  display: flex;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export const PageSectionTitle = styled.h1`
  margin-bottom: 40px;
`;

export const SectionDescription = styled.div`
  width: 40%;

  @media (max-width: 850px) {
    width: 100%;
    margin-bottom: 10px;
  }

  h2 {
    font-weight: normal;
  }

  p {
    color: #4b4b4b;
  }
`;
