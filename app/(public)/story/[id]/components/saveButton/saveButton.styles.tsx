import styled from "styled-components";

export const SaveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: flex-start;

  span {
    text-decoration: none;
    font-size: 1rem;
    margin-right: 5px;
    opacity: 0;
    transition: 0.1s;
    pointer-events: none;
    &.visible {
      opacity: 1;
    }
  }

  @media (max-width: 850px) {
    font-size: 1.1rem;
    top: 5px;
    right: 0;
  }
`;