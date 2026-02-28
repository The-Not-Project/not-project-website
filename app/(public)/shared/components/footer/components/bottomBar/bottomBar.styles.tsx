import styled from "styled-components";

export const BottomBarContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  opacity: 0.6;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-top: 20px;

  p {
    cursor: pointer;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
  
  @media (max-width: 1000px) {
    padding: 1rem;
    height: auto;
  }
`;