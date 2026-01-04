import Link from "next/link";
import styled, { keyframes } from "styled-components";

type RadarCardProps = { $isVisible: boolean; $url: string };

export const RadarCardContainer = styled.section`
  height: auto;
  aspect-ratio: 21 / 9;
  margin: 100px auto;
  position: relative;
  color: #040605;

  @media (max-width: 600px) {
    margin-block: 30px;
    aspect-ratio: 3 / 4;
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

  @media (max-width: 850px) {
    flex-flow: column;
    &.is-visible {
      background: linear-gradient(
        to right,
        rgba(13, 13, 13) 10%,
        rgba(13, 13, 13, 0.8) 70%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
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

        @media (max-width: 850px) {
          &.summary {
            opacity: 0.8;
          }
        }
      }
    }

    @media (max-width: 850px) {
      padding-top: 30px;
      padding-inline: 30px;
      gap: 30px;
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
        -webkit-text-stroke: unset;
        color: #eae0d5;
        font-size: 3rem;
        width: 100%;
      }
    }

    .summary {
      font-size: 1.2rem;
      width: 80%;

      @media (max-width: 850px) {
        font-size: 0.9rem;
        width: 100%;
      }
    }

    .author {
      font-family: "GeorgiaWeb", serif;
      font-style: italic;
      margin-top: auto;
      font-size: 1rem;
      @media (max-width: 850px) {
        order: -1;
        margin-block: 0 20px;
      }
    }
    font-size: 1.5rem;
    transition: opacity 0.3s ease-out 0.5s;
  }

  .secondary-info-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 50px;
    min-width: fit-content;
    overflow: hidden;

    @media (max-width: 850px) {
      flex-flow: row-reverse;
      align-items: center;
      justify-content: space-between;
      padding-inline: 30px;
      padding-bottom: 20px;
    }

    .slide-on-scroll {
      translate: 200px;
      transition:
        translate 0.3s ease-out 1s,
        color 0.2s;

      @media (max-width: 850px) {
        translate: 0 100px;
      }

      &.is-visible {
        translate: 0;
      }
    }
  }
`;

export const ArrowLink = styled(Link)`
  color: #d4af37;
  font-size: 3rem;
  transition: 0.2s;
  margin-top: auto;

  &:hover {
    color: beige;
  }

  @media (max-width: 850px) {
    font-size: 2.2rem;
    margin: 0;
    display: flex;
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
  color: #d7b74d;
  height: 100px;
  width: 100px;
  display: grid;
  place-items: center;
  background-color: black;
  border-radius: 50%;
  font-size: 1.5rem;
  margin-bottom: 20px;
  border: 1.5px solid #e7d086;
  text-transform: uppercase;
  cursor: pointer;

  @media (max-width: 850px) {
    width: 50px;
    height: 50px;
    font-size: 1rem;
    margin: 0;

    .circle {
      text {
        font-size: 2.2rem;
      }
    }

    .pin {
    }
  }

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

    @media (max-width: 850px) {
      font-size: 2rem;
      background: linear-gradient(
        to bottom,
        rgba(13, 13, 13) 0%,
        rgba(13, 13, 13, 0.8) 30%,
        rgba(13, 13, 13, 0.7) 40%,
        rgba(13, 13, 13, 0.7) 60%,
        rgba(13, 13, 13, 0.8) 70%,
        rgba(13, 13, 13) 100%
      );
    }
  }

  &.is-visible {
    &::after {
      scale: 2;
      opacity: 0;
    }
  }
  @media (max-width: 850px) {
    &.is-visible {
      &::after {
        scale: 1.3;
      }
    }
  }
`;
