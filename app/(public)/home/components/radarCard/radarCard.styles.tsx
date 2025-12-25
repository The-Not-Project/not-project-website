import styled from "styled-components";

type RadarDescriptionProps = { $isVisible: boolean; $url: string };

export const RadarCardContainer = styled.section`
  font-family: "Oswald", sans-serif;
  display: flex;
  max-width: 180vh;
  height: calc(50vw - 80px);
  max-height: 90vh;
  margin: 40px auto;
  padding-inline: 40px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  color: #040605;

  @media (max-width: 600px) {
    margin-block: 20px 0;
    padding: 5px;
    height: 70vw;
  }
`;

export const RadarDescription = styled.div<RadarDescriptionProps>`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #f9faf9;
  width: ${({ $isVisible }) => ($isVisible ? "50%" : "100%")};
  height: 100%;
  position: relative;
  transition: 0.3s ease-out;
  background: var(--radar-bg);

  @media (max-width: 850px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    padding: 15px 17px;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0;
    text-align: left;
    z-index: 2;

    transition:
      opacity 0.3s ease-out 0.3s,
      translate 0.3s ease-out 0.3s;
    opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
    translate: 0 ${({ $isVisible }) => ($isVisible ? "0" : "10px")};
  }

  .title {
    text-wrap: balance;
    font-size: clamp(2rem, 3rem, 3vw);
    transition: opacity 0.3s ease-out 0.5s;
    opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
    @media (max-width: 850px) {
      transition: none;
      opacity: 1;
      font-weight: normal;
      font-size: 1.3rem;
    }
  }

  .summary {
    font-size: clamp(1rem, 2rem, 1.5vw);
    font-style: italic;
    transition: opacity 0.3s ease-out 0.5s;
    opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
    @media (max-width: 850px) {
      display: none;
    }
  }

  .date {
    position: absolute;
    bottom: 30px;
    font-size: 1.5rem;
    transition: opacity 0.3s ease-out 0.5s;
    opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
    @media (max-width: 850px) {
      transition: none;

      opacity: 1;
      position: static;
      font-size: 0.9rem;
      color: #e5e5e5;
    }
  }

  .overlay {
    background: url("${({ $url }) => $url}") no-repeat center center/cover;

    background-size: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease-out;
    opacity: ${({ $isVisible }) => ($isVisible ? "0" : "1")};

    @media (max-width: 850px) {
      display: none;
    }

    &::after {
      content: "Our Radar";
      background: var(--radar-overlay);
      color: hsl(104, 8%, 90%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      backdrop-filter: blur(5px) contrast(1.5);
    }
  }
`;

export const RadarPhoto = styled.div<{ $url: string }>`
  background: url("${({ $url }) => $url}") no-repeat center center/cover;
  flex-grow: 1;
  transition: 0.3s ease-out;
  position: relative;
  @media (max-width: 850px) {
    transition: none;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 850px) {
    display: none;
  }
`;

export const Category = styled.div`
  background: maroon;
  font-size: 0.8rem;
  padding: 10px 4px;
  line-height: 0;
  border-radius: 1px;
`;
