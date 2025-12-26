import styled, { keyframes } from "styled-components";
import NextLink from "next/link";

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
    flex-flow: column;
    aspect-ratio: 3/4;
    border-radius: 10px;
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
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    color: #e7e0d6;
    animation: ${fadepulsateslow} 1s;

    @media (max-width: 850px) {
      width: 100%;
      height: 50%;
      padding: 0 50px 20px 30px;
      justify-content: flex-start;
    }

    h2 {
      font-family: "GeorgiaWeb", serif;
      margin-top: 10px;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 3rem;
      margin-top: auto;
      @media (max-width: 850px) {
        font-size: 1.6rem;
      }
    }

    hr {
      height: 3px;
      width: 40px;
      background: #8b5e34;
      margin-block: 10px 15px;
      border: none;
      border-radius: 2px;
      margin-top: 5px;
    }

    p {
      font-size: 1rem;
      color: rgb(231, 224, 214, 0.7);
      font-size: 0.9rem;
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
      @media (max-width: 850px) {
        font-size: 0.7rem;
        padding-inline: 15px;
      }

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

  @media (max-width: 850px) {
    width: 100%;
    height: 50%;
    border-radius: 0;
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

  @media (max-width: 850px) {
    height: 6px;
    width: 20px;

    &.active {
      width: 35px;
    }
  }

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
    @media (max-width: 850px) {
      width: 35px;
    }

    &::after {
      transition: transform 10s linear;
      transform: scaleX(1);
    }
  }
`;
