import styled from 'styled-components';

export const BoroughTitle = styled.h1`
  font-family: "Rubik Glitch Pop", system-ui;
  text-align: center;
  font-size: 2.5rem;
  margin-block: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`

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
