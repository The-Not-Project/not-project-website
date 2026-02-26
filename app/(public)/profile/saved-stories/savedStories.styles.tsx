import styled from "styled-components";

export const StoriesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  height: 120px;
  position: relative;

  @media (max-width: 850px) {
    height: 200px;
    flex-direction: column;
    justify-content: end;
    padding: 20px;
    max-width: 400px;
    margin-inline: auto;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 3px;
      z-index: 0;
    }
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 3px;

  img {
    width: 100% !important;
  }

  @media (max-width: 850px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const StoryContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: center;
  gap: 10px;
  z-index: 1;

  .title {
    font-size: 1.5rem;
    font-weight: normal;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
    @media (max-width: 850px) {
      text-align: center;
      a {
        color: white;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .info {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #bababa;

    .divider {
      translate: 0 2px;
    }

    @media (max-width: 850px) {
      color: white;
      justify-content: center;
    }
  }
`;
