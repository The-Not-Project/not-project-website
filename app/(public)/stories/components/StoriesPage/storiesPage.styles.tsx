import styled from "styled-components";

export const StoriesContainer = styled.div`
  display: flex;
  margin-inline: 40px;
  gap: 50px;
  margin-block: 50px;

  @media (max-width: 1600px) {
    flex-direction: column;
    padding-inline: 60px;
    gap: 10px;
  }

  @media (max-width: 850px) {
    flex-direction: column;
    padding-inline: 20px;
    margin-inline: 0;
    gap: 10px;
  }
`;

export const SectionTitle = styled.div`
  margin: 50px;
  padding-bottom: 20px;
  border-bottom: 1px #80808050 solid;
  @media (max-width: 850px) {
    margin: 50px 20px 
  }
  h2 {
    color: #d4af37;
    font-size: 0.8rem;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      margin-right: 10px;
      background: #d8c27b;
      border-radius: 5px;
    }
  }

  h3 {
    color: white;
    font-family: "GeorgiaWeb", serif;
    font-style: italic;
    font-size: 3rem;
    font-weight: normal;
    @media (max-width: 850px) {
      font-size: 2rem;
    }
  }
`;
