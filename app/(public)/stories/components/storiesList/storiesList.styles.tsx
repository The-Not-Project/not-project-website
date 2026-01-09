import styled from "styled-components";

export const StoriesListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  height: max-content;

  @media (max-width: 850px) {
    gap: 20px;
  }
`;

export const NoStoriesMessage = styled.p`
  margin-top: 50px;
  font-size: 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
`;

export const FollowupMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  text-align: center;
  
  a {
    color: #cacaca;
  }
`;
