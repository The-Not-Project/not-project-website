import Link from "next/link";
import styled from "styled-components";

export const RecommendationsContainer = styled.section`
  width: 90%;
  margin: 100px auto;
  @media (max-width: 600px) {
    margin-block: 50px;
    width: 100%;
  }
`;

export const BigTitle = styled.h2`
  color: #d4af37;
  margin-bottom: 5px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 2px;
  @media (max-width: 850px) {
    margin-left: 20px;
  }
`;

export const SecondaryTitle = styled.h3`
  font-weight: normal;
  color: white;
  font-family: "GeorgiaWeb", serif;
  font-size: 2rem;
  margin-top: 10px;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-left: 20px;
    margin-top: 0;
  }
`;

export const RecommendationsList = styled.div`
  display: flex;
  margin-block: 30px;
  margin-inline: auto;
  overflow: overlay;
  gap: 50px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 850px) {
    gap: 20px;
    overflow-x: scroll;
    /* scroll-snap-type: x mandatory; */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    justify-content: flex-start;
    padding-inline: 30px;
  }
`;

export const RecommendationCardContainer = styled.div`
  min-width: 350px;
  padding: 40px 35px;
  display: flex;
  flex-flow: column;
  background: transparent;
  /* border: 1px solid #cbcbcb; */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 2/3;

  @media (max-width: 850px) {
    scroll-snap-align: center;
    flex: 0 0 100%;
    padding: 25px 25px;
    width: 90%;
    min-width: unset;
  }

  .content {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;

    .title {
      font-size: 1.6rem;
      font-weight: normal;
      color: white;
      font-family: "GeorgiaWeb", serif;
    }

    .date {
      color: #c1c1c1;
      font-size: 0.8rem;
      margin-bottom: 5px;
    }

    /* .summary {
      margin-block: 10px;
      color: #b5b5b5;
      line-height: 1.4em;
    } */

    .second-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 25px;
      font-size: 0.8rem;
      color: #dbdbdb;

      .category {
        color: #d4af37;
        font-size: 0.7rem;
        padding: 2px 7px;
        border-radius: 50px;
      }

      a {
        width: fit-content;
        color: #e7e0d6;
        border: #e7e0d6 1px solid;
        margin-top: auto;
        font-size: 0.9em;
        text-decoration: none;
        padding: 5px 10px;
        border-radius: 20px;
        display: flex;
        gap: 3px;
        align-items: center;
        transition: 0.2s;

        &:hover {
          color: black;
          background: #e7e0d6;
        }
      }
    }
  }
`;

export const ImageContainer = styled.figure`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgb(13, 13, 13, 0.4) 30%,
      rgb(13, 13, 13, 0.6) 50%,
      rgb(13, 13, 13, 0.8) 60%,
      rgb(13, 13, 13, 0.9) 70%,
      rgb(13, 13, 13) 100%
    );
  }

  @media (max-width: 850px) {
    aspect-ratio: 16 / 10;
    margin-bottom: 10px;
  }
`;

export const PlaceholderContainer = styled(RecommendationCardContainer)`
  .skeleton {
    opacity: 0.5;
    background: linear-gradient(90deg, #e0e0e0 25%, #f2f2f2 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
    border-radius: 4px;
    width: 100%;

    &.category-skeleton {
      height: 16px;
      width: 30%;
      padding-block: 5px;
    }

    &.image {
      height: 225px;
      margin-bottom: 15px;
    }

    &.title {
      height: 30px;
      margin-block: 10px;
    }
    &.summary {
      height: 20px;
      margin-bottom: 5px;

      &.half {
        width: 50%;
      }
    }
  }
`;

export const StoriesPageLinkContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const StoriesPageLink = styled(Link)`
  color: #d4af37;
  font-size: 2rem;
  border: 2px solid #d4af37;
  border-radius: 100%;
  display: flex;
  align-items: center;
  padding: 25px;
  transition: 0.2s;

  &:hover {
    color: black;
    background: #d4af37;
  }
`;

export const LinkLabel = styled.p`
  width: max-content;
  color: white;
  font-size: 1.4rem;
  font-family: "GeorgiaWeb", serif;
`;
