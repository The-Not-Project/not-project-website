import styled from "styled-components";

export const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  padding-block: 10px;
  border-bottom: 1px solid #8e8e8e50;
  margin-bottom: 10px;
  position: relative;

  @media (max-width: 850px) {
    border: none;
    padding: 0;
    height: 210px;
    overflow: hidden;
    border-radius: 5px;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    padding: 20px 20px 15px 20px;
    max-width: 400px;
  }
  .second-row {
    font-size: 0.7rem;
    padding-inline: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    @media (min-width: 850px) {
      display: none;
    }

    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export const StoryContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  @media (max-width: 850px) {
    min-height: unset;
    overflow: hidden;
    gap: 15px;
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  }

  .createdAt {
    margin-top: auto;
    color: #e7e0d6;
    @media (max-width: 850px) {
      display: none;
    }
  }

  .title {
    font-size: 2rem;
    font-weight: normal;
    font-family: var(--font-georgia), serif;
    margin-block: 5px 10px;
    color: #e7e0d6;
    @media (max-width: 850px) {
      font-size: 1.5rem;
      color: white;
      margin: 0;
    }
  }

  a {
    color: unset;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    color: rgb(231, 224, 214, 0.7);
    font-size: 0.9rem;

    @media (max-width: 850px) {
      color: #ffffffc1;
      font-size: 0.8rem;
    }
  }
`;

export const StoryImageContainer = styled.div`
  min-width: 350px;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-block: 10px;
  position: relative;

  @media (max-width: 850px) {
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    top: 0;
    left: 0;
    z-index: -1;
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
    }
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

  @media (max-width: 850px) {
    display: none;
  }
`;
