import styled from "styled-components";

export const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  padding-block: 15px;
  border-bottom: 1px solid gray;

  .skeleton {
    opacity: 0.5;
    background: linear-gradient(90deg, #e0e0e0 25%, #f2f2f2 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
    border-radius: 4px;
    width: 100%;

    &.title {
      height: 30px;
      margin-block: 20px;
    }
    &.summary {
      height: 20px;
      margin-bottom: 5px;

      &.half {
        width: 50%;
      }
    }
  }

  @media (max-width: 850px) {
    border: none;
    padding: 0;
  }

  .desktop-thumbnail {
    width: 300px;
    min-width: 300px;
    height: 180px;
  }
`;

export const StoryContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;

`;

export const MobileStoryBody = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 100px -40px rgba(0, 0, 0, 0.3);
  .first-row {
    display: flex;
    gap: 20px;

    .thumbnail {
      width: 33%;
      aspect-ratio: 4 / 5;
      height: 100%;
      border-radius: 5px;
    }

    .title {
      margin: 0;
      height: 20px;
      margin-bottom: 5px;

      &.half {
        width: 70%;
      }
    }

    .summary {
      height: 17px;
      width: 100%;
    }

    .content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-bottom: 5px;
    }
  }

  .second-row {
    padding-top: 15px;
    padding-inline: 50px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
