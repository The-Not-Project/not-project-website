import styled from "styled-components";
import { FaBan } from "react-icons/fa6";

export const Disabled = styled(FaBan)`
  position: absolute;
  bottom: 50px;
  right: 5px;
  opacity: 0.8;
`;

export const StyledForm = styled.form`
  width: 100%;
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  text-indent: 5px;
  border: none;
  background: none;
  border-bottom: 2px solid #fff;
  outline: none;
  margin-bottom: 40px;
  color: inherit;
  position: relative;

  &:after {
    content: "lol";
    color: red;
    position: absolute;
    left: 0;
    top: 0;
  }

  &:disabled {
    opacity: 0.8;
    border-color: #cacaca;
  }
`;

export const FormLabel = styled.label`
  font-size: 0.9rem;
  position: relative;

  &.email {
    grid-column: 1 / -1;
  }
`;

export const FormButton = styled.button`
  width: 100px;
  height: 40px;
  background: #dbdbdb;
  border: none;
  border-radius: 20px;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
  &:hover {
    background: #b8b8b8;
  }
  &:active {
    background: #7e7e7e;
  }
`;

export const FormButtonOutlined = styled(FormButton)`
  background: transparent;
  color: #dbdbdb;
  border: 1.5px solid #dbdbdb;
  background: none;
  padding-inline: 7px;

  &:hover,
  &:active {
    background: unset;
  }
`;

export const ButtonsContainer = styled.div`
  grid-column: 1 / -1;
  width: fit-content;
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-left: auto;

  @media (max-width: 850px) {
    margin-top: 5px;
  }
`;
