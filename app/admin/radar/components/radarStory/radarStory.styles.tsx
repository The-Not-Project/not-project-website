import styled from "styled-components";

export const RadarCardContainer = styled.section`
  display: flex;
  margin: 40px auto;
  max-width: 900px;
  aspect-ratio: 2 / 1;

  @media (max-width: 850px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
  }
`;

export const RadarDescription = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding: 100px 50px 30px 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  width: 50%;
  position: relative;
  transition: 0.3s ease-out;
  background: #fff;

  .summary {
    font-style: italic;
  }

  .author {
    margin-top: auto;
  }

  @media (max-width: 850px) {
    width: 100%;
    height: auto;
    padding: 20px;
  }
`;

export const RadarPhoto = styled.div<{ $url: string }>`
  flex-grow: 1;
  background: url(${({ $url }) => $url}) no-repeat center center/cover;
`;
export const DeleteButton = styled.p`
  cursor: pointer;
`;
