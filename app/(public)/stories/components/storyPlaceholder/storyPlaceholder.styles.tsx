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
  
  .thumbnail {
    width: 300px;
    min-width: 300px;
    height: 180px;
    @media (max-width: 850px) {
      width: 100%;
      height: 210px;
    }
  }
  `;

export const StoryContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  @media (max-width: 850px) {
    display: none;
  }
`;
