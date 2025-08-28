import styled from "styled-components";
import NextLink from "next/link";

type PathElementProps = {
  x: number;
  y: number;
  $scatterprogress: number;
  $scatteroffsetx: number;
  $scatteroffsety: number;
  $scatterrotate: number;
};

export const BoroughsSectionContainer = styled.section`
  font-family: "Oswald", sans-serif;
  height: calc(100vh - 80px);
  max-height: 60vw;
  position: relative;
  color: white;
  text-shadow: 0 0 20px hsl(0, 0%, 0%, 0.3);
  overflow: hidden;
  background: linear-gradient(var(--bg-color), transparent);

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
  }

  .description {
    text-align: center;

    h2 {
      margin-top: 10px;
      font-size: 10vw;
      font-weight: 500;
      text-transform: uppercase;
      color: white;
    }

    p {
      font-size: clamp(1rem, 2rem, 2vw);
    }

    animation: fadepulsateslow 1s;
  }
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  animation: fadepulsatefast 0.66s;

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
