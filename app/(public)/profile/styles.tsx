import styled from "styled-components";


export const ProfileContainer = styled.div`
  max-width: 1000px;
  height: 100vh;
  margin-inline: auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #cbcbcb;

  hr {
    margin-block: 50px 40px;
    margin-inline: 40px;
    border: #55555562 1px solid;
  }

  @media (max-width: 850px) {
    height: auto;
    margin-block: 80px;
    hr {
      margin: 20px 0;
    }
  }
`;

export const PageSection = styled.section`
  display: flex;
  gap: 30px;

  @media (max-width: 850px) {
    flex-direction: column;

    &.saves {
      gap: 15px;
    }
  }
`;

export const PageSectionTitle = styled.h1`
  margin-bottom: 40px;
`;

export const SectionDescription = styled.div`
  width: 66%;

  h2 {
    font-weight: normal;
  }

  p {
    color: #bababa;
  }
`;
