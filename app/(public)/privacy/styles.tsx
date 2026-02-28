import styled from "styled-components";

export const PrivacyContainer = styled.main`
  color: #cbcbcb;
  max-width: 1000px;
  margin: 150px auto;
  padding-inline: 50px;

  h1 {
    margin-bottom: 30px;
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1.2rem;
    margin-block: 5px 20px;

    &.date {
      margin-top: 50px;
      font-size: 1rem;
    }
  }

  @media (max-width: 850px) {
    margin-block: 100px 50px;
    padding-inline: 15px;
    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.1rem;
    }
  }
`;
