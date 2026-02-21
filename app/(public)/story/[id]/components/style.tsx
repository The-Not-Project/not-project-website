import styled from "styled-components";

export const StoryWrapper = styled.main`
  background: #e7e0d6;
`;

export const StoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 100px 70px;

  @media (max-width: 850px) {
    width: 100%;
    padding: 80px 20px;
  }

  .title {
    font-weight: normal;
    font-size: 4rem;
    font-family: var(--font-georgia), serif;
    @media (max-width: 850px) {
      font-size: 2.4rem;
    }
  }

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-block: 20px;
  }

  sup,
  sub {
    display: block;
    translate: 0 -20px;
    color: #3a3a3a;
  }

  a {
    color: #5a3a2a !important;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 5 / 3;
  position: relative;
  margin-block:40px 20px;

  img {
    margin: 0;
  }

    @media (max-width: 850px) {
    margin-block: 20px 15px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-top: 5px;
  border-top: 1px solid black;
  @media (max-width: 850px) {
    margin-block: 3px 30px;
    font-size: 0.8rem;
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  gap: 5px;
  position: relative;
  margin-bottom: 20px;

  .divider {
    scale: 0.7;
    color: gray;
  }

  a {
   color: inherit !important;
  }
`;

export const Skeleton = styled.div`
  opacity: 0.3;
  background: linear-gradient(90deg, #3c3c3c 25%, #4e4e4e 50%, #3c3c3c 75%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
  border-radius: 4px;
  width: 100%;

  &.title {
    height: 2.5rem;
    margin-bottom: 20px;
  }

  &.half {
    width: 70%;
  }

  &.thumbnail {
    aspect-ratio: 16 / 9;
    height: 100%;
    margin-block: 50px;
  }

  &.paragraph {
    height: 1.5rem;
    margin-bottom: 10px;
  }
`;

export const ErrorMessage = styled.h1`
  text-align: center;
  height: 100vh;
  display: grid;
  place-items: center;
  background: #e7e0d6;
`;
