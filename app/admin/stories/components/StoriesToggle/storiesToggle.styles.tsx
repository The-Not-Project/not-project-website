import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  position: absolute;
  top: 30px;
  right: 40px;

  @media (max-width: 850px) {
    right: 0px;
    top: 8px;
  }
`;
