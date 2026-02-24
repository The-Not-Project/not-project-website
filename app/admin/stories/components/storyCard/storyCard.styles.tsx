import Image from "next/image";
import styled from "styled-components";

export const StoryContainer = styled.li`
  display: flex;
  gap: 20px;

  @media (max-width: 850px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const StoryImageContainer = styled(Image)`
  height: 100px;
  width: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;

  @media (max-width: 850px) {
    width: 100%;
    aspect-ratio: 2 /1;
    height: auto;
    border-radius: 0;
  }
`;

export const StoryContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    display: flex;
    align-items: center;
  }

  span {
    text-transform: uppercase;
    font-size: 0.8rem;
    color: gray;
    margin-left: 10px;
    letter-spacing: 1px;
  }

  @media (max-width: 850px) {
    background: white;
    padding: 15px;
  }
`;

export const ActionsContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-right: 10px;

  @media (max-width: 850px) {
    background: white;
    margin: 0;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 0 20px 15px;
  }
`;
