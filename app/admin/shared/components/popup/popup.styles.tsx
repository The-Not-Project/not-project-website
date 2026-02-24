import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const Popup = styled.div`
  background-color: #f7f7f7;
  border-radius: 20px;
  padding: 30px;  

  @media (max-width: 850px) {
    width: calc(100% - 40px);
  }
`;
