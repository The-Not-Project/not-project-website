import styled from "styled-components";

export const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  padding-block: 10px;
  border-bottom: 1px solid #8e8e8e50;
  margin-bottom: 10px;

  @media (max-width: 850px) {
    border: none;
    padding: 0;
  }

  .image-container {
    min-width: 350px;
    height: auto;
    aspect-ratio: 16 / 9;
    margin-block: 10px;
    position: relative;
  }
`;

export const StoryContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .createdAt {
    margin-top: auto;
    color: #e7e0d6;
  }

  .title {
    font-size: 2rem;
    font-weight: normal;
    font-family: "eorgiaWeb", serif;
    margin-block: 5px 10px;
    color: #e7e0d6;

    a {
      color: unset;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    color: rgb(231, 224, 214, 0.7);
    font-size: 0.9rem;
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  gap: 5px;
  font-size: 0.8rem;
  color: #e5d295;
  text-transform: uppercase;
  letter-spacing: 1px;

  .divider {
    scale: 0.7;
    color: gray;
  }
`;

export const MobileStoryBody = styled.div`
  padding: 20px;
  border-radius: 5px;
  position: relative;
  color: white;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    z-index: -1;
  }

  &::after {
    content: "";
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      rgb(13, 13, 13, 0.5) 20%,
      rgb(13, 13, 13, 0.7) 50%,
      rgb(13, 13, 13, 0.9) 70%
    );
    z-index: -1;
  }
  .first-row {
    display: flex;
    gap: 20px;

    .content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding-bottom: 5px;

      h2 {
        font-size: 1.5rem;
        font-family: "GeorgiaWeb", serif;
        font-weight: normal;
      }

      p {
        font-size: 0.8rem;
        color: #ffffffc1;
      }
    }
  }

  .second-row {
    font-size: 0.7rem;
    padding-top: 15px;
    padding-inline: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;
