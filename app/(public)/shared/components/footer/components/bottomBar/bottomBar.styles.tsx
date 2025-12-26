import styled from "styled-components";

export const BottomBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  flex-wrap: wrap;
  opacity: 0.6;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-top: 40px;
  
  @media (max-width: 1000px) {
    margin-top: 20px;
    padding: 1rem;
    height: auto;
  }
`;