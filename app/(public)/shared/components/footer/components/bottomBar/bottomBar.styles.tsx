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
    height: auto;
    padding: 1rem;
    gap: 25px;
    
    p {
      text-align: center;
      width: 100%;
    }
  }
`;

export const LegalLinks = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 1000px) {
    flex: 1 100%;
    justify-content: center;
  }

  p {
    color: white;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;