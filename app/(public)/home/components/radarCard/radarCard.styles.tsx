import Link from "next/link";
import styled, { keyframes } from "styled-components";

type RadarCardProps = { $isVisible: boolean; $url: string };

export const RadarCardContainer = styled.section`
  height: auto;
  aspect-ratio: 21 / 9;
  margin: 100px auto;
  /* padding-inline: 40px; */
  position: relative;
  color: #040605;

  @media (max-width: 600px) {
    margin-block: 20px 0;
    padding: 5px;
    height: 70vw;
  }
`;

export const RadarDescription = styled.div<RadarCardProps>`
  height: 100%;
  display: flex;
  &.is-visible {
    background: linear-gradient(
      to right,
      rgba(13, 13, 13) 10%,
      rgba(13, 13, 13, 0.8) 40%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }

  .main-info-container {
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    gap: 50px;
    padding: 5% 50px;
    color: #f9faf9;
    transition: 0.3s ease-out;

    .reveal-on-scroll {
      opacity: 0;
      filter: blur(5px);
      transition: 0.3s ease-out;
      transition-delay: 0.5s;

      &.is-visible {
        opacity: 1;
        filter: blur(0);
      }
    }

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
      /* text-wrap: balance; */
      color: transparent;
      font-family: "GeorgiaWeb", serif;
      text-transform: uppercase;
      font-size: 4rem;
      letter-spacing: 2px;
      width: 75%;
      -webkit-text-stroke: 2px #eae0d5;

      @media (max-width: 850px) {
        transition: none;
        opacity: 1;
        font-weight: normal;
        font-size: 1.3rem;
      }
    }

    .summary {
      font-size: 1.2rem;
      width: 80%;
      @media (max-width: 850px) {
        display: none;
      }
    }

    .author {
      font-family: "GeorgiaWeb", serif;
      font-style: italic;
      margin-top: auto;
      font-size: 1rem;
    }
    font-size: 1.5rem;
    transition: opacity 0.3s ease-out 0.5s;
    @media (max-width: 850px) {
      transition: none;

      opacity: 1;
      position: static;
      font-size: 0.9rem;
      color: #e5e5e5;
    }
  }

  .secondary-info-container {
    min-width: max-content;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 50px;
    width: max-content;
    overflow: hidden;

    .slide-on-scroll {
      translate: 200px;
      transition: translate 0.3s ease-out 1s, color 0.2s;

      &.is-visible {
        translate: 0;
      }
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

export const ArrowLink = styled(Link)`
  color: #ac5521;
  font-size: 3rem;
  transition: 0.2s;
  margin-top: auto;

  &:hover {
    color: beige;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const LocationContainer = styled.div`
  margin-top: auto;
  color: #ac5521;
  height: 100px;
  width: 100px;
  display: grid;
  place-items: center;
  background-color: black;
  border-radius: 50%;
  font-size: 1.5rem;
  margin-bottom: 50px;
  border: 1.5px solid #ac5521;
  text-transform: uppercase;
  cursor: pointer;

  .circle {
    width: 105%;
    height: 105%;
    display: block;
    animation: ${rotate} 10s linear infinite;

    text {
      font-size: 2.2rem;
      font-weight: bold;
      letter-spacing: 1px;
      fill: #fff;
    }
  }

  .pin {
    position: absolute;
  }
`;

export const RadarPhoto = styled.div<{ $url: string }>`
  background: url(${({ $url }) => $url}) no-repeat center center/cover;
  transition: 0.3s ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  &::after {
    content: "Our Radar";
    font-family: "GeorgiaWeb", serif;
    background: linear-gradient(
      to bottom,
      rgba(13, 13, 13) 0%,
      rgba(13, 13, 13, 0.8) 20%,
      rgba(13, 13, 13, 0.7) 40%,
      rgba(13, 13, 13, 0.7) 60%,
      rgba(13, 13, 13, 0.8) 80%,
      rgba(13, 13, 13) 100%
    );
    color: #eae0d5;
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
    transition: 0.5s ease-out;
  }

  &.is-visible {
    &::after {
      scale: 2;
      opacity: 0;
    }
  }
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
