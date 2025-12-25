import styled, { keyframes } from "styled-components";
import NextLink from "next/link";

type PathElementProps = {
  x: number;
  y: number;
  $scatterprogress: number;
  $scatteroffsetx: number;
  $scatteroffsety: number;
  $scatterrotate: number;
};

const fadepulsateslow = keyframes`
  33% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const BoroughsSectionContainer = styled.section`
  color: white;
  text-shadow: 0 0 20px hsl(0, 0%, 0%, 0.3);
  overflow: hidden;
  aspect-ratio: 2 / 1;
  margin: 0 auto;
  width: 90%;
  height: auto;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1b1917;

  @media (max-width: 850px) {
    height: max-content;
    max-height: unset;
    background: none;

    &.secondary {
      background: linear-gradient(
        var(--bg-color),
        hsl(35, 46%, 95%, 0.5) 20%,
        hsl(35, 46%, 95%, 0.5) 80%,
        var(--bg-color)
      );
    }
  }

  h1 {
    font-size: 10vw;
    position: absolute;
    top: 30px;
    left: 50%;
    translate: -50%;
    width: 100%;
    text-align: center;
    z-index: -1;
    animation: ${fadepulsateslow} 1s;
  }

  .description {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    color: #e7e0d6;

    h2 {
      font-family: "GeorgiaWeb", serif;
      margin-top: 10px;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 3rem;
      margin-top: auto;
      animation: ${fadepulsateslow} 1s;
    }

    hr {
      height: 3px;
      width: 40px;
      background: #cf6b31;
      margin-block: 10px 15px;
      border: none;
      border-radius: 2px;
      animation: ${fadepulsateslow} 1s;
    }

    p {
      font-size: 1rem;
      color: rgb(231, 224, 214, 0.7);
      font-size: 0.9rem;
      animation: ${fadepulsateslow} 1s;
    }

    a {
      background: #e7e0d6;
      color: black;
      text-decoration: none;
      width: fit-content;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: auto;
      padding: 8px 20px;
      border-radius: 30px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.8rem;
      transition: 0.2s;

      &:hover {
        color: #e7e0d6;
        background: #cf6b31;
      }
    }
  }
`;

const fadepulsatefast = keyframes`
  50% {
    filter: blur(500px);
  }
  100% {
    filter: none;
  }
`;

export const Background = styled.div`
  border-radius: 30px;
  overflow: hidden;
  height: 100%;
  width: 50%;
  animation: ${fadepulsatefast} 0.66s;
  position: relative;


  @media (max-width: 600px) {
    animation: none;
  }
`;

export const SVGContainer = styled.div`
  height: 70%;
  width: auto;
  position: absolute;
  left: 50%;
  bottom: 0;
  translate: -50%;
  z-index: 2;

  @media (max-width: 600px) {
    position: unset;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    translate: -50%;
    translate: none;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DesktopPath = styled.path`
  cursor: pointer;
  fill: var(--bg-color);
  opacity: 0.8;

  &.active {
    stroke: hsl(0, 0%, 0%, 0.5);
    filter: drop-shadow(0 0 20px hsl(36, 47%, 0%, 0.5));
    opacity: 1;
  }
`;

export const MobilePath = styled.path<PathElementProps>`
  stroke: hsl(0, 0%, 0%, 0);
  fill: var(--bg-color);
  transition: 0.2s;
  transition-property: scale, translate, fill, stroke;

  &.active,
  &.shrinking {
    scale: 1.1;
    translate: ${({ x, y }) => `${x}% ${y}%`};
    fill: hsl(0, 0%, 0%, 0.2);
    stroke: white;
    stroke-width: 4px;
  }

  &.scatter {
    transform: ${({
      $scatteroffsetx,
      $scatteroffsety,
      $scatterprogress,
      $scatterrotate,
    }) =>
      `translate(${$scatteroffsetx * $scatterprogress}px, ${
        $scatteroffsety * $scatterprogress
      }px) rotate(${$scatterrotate * $scatterprogress}deg)`};
    opacity: ${({ $scatterprogress }) => 1 - $scatterprogress};
  }

  &.hidden {
    display: none;
  }
`;

export const BoroughPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, black);
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 10px 30px 20px;
  h2 a {
    font-size: 13vw;
    font-weight: 500;
    text-transform: uppercase;
    color: white;
    display: flex;
    align-items: center;

    .icon {
      scale: 0.8;
      translate: 0 2px;
    }
  }

  a {
    color: white;
    font-size: 1.8rem;
    text-decoration: none;
  }
`;

export const Link = styled(NextLink)`
  color: black;
  font-size: 1.5rem;
`;

export const BoroughSelector = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const BoroughButton = styled.button`
  height: 5px;
  width: 15px;
  border: none;
  outline: none;
  border-radius: 5px;
  background: gray;
  transition: 0.2s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: #fff;
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover {
    cursor: pointer;
    background: #fff;
  }

  &.active {
    width: 30px;

    &::after {
      transition: transform 10s linear;
      transform: scaleX(1);
    }
  }
`;
