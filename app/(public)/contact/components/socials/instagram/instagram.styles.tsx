import styled from "styled-components";

export const InstagramContainer = styled.section`
  max-width: 1600px;
  margin: 50px auto;
  padding-inline: 50px;
  color: white;

  @media (max-width: 850px) {
    padding: 0;
    margin-block: 30px 50px;
  }
`;

export const InstagramInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 50px;

  a {
    color: inherit;
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    border: 1px solid white;
    padding: 5px 20px;
  }

  @media (max-width: 850px) {
    padding-inline: 10px;
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

export const InstagramContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;

  div {
    position: relative;
    aspect-ratio: 1 / 1;

    img {
      object-fit: cover;
    }

    &:first-child {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    &:nth-child(2) {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    &:nth-child(3) {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }

    &:nth-child(4) {
      grid-column: 4 / 6;
      grid-row: 1 / 3;
    }

    &:nth-child(5) {
      grid-column: 1 / 3;
      grid-row: 2 / 4;
    }
    &:nth-child(6) {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }
    &:nth-child(7) {
      grid-column: 3 / 4;
      grid-row: 3 / 4;
    }
    &:nth-child(8) {
      grid-column: 4 / 5;
      grid-row: 3 / 4;
    }
    &:nth-child(9) {
      grid-column: 5 / 6;
      grid-row: 3 / 4;
    }
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;

    div:nth-child(n) {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;
