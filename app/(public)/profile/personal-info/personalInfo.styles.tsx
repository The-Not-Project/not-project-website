import styled from "styled-components";

export const StyledForm = styled.form`
  flex-grow: 1;
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 10px;

  div {
    flex-grow: 1;
  }
`;

export const FormInput = styled.input`
  display: block;
  font-size: 1.2rem;
  width: 100%;
  height: 40px;
  outline: none;
  border-radius: 4px;
  text-indent: 7px;
  margin-bottom: 10px;
  border: 1px solid #ccc;

  &:focus {
    border: 1px solid hsl(103, 30%, 35%);
  }

  &:disabled {
    border-color: transparent;
    background-color: hsl(35, 10%, 90%);
    cursor: not-allowed;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 5px;
  padding-left: 2px;

    @media (max-width: 850px) {
   font-size: 1rem;
  } 
`;

export const FormButton = styled.button`
    padding: 6px 10px;
    font-size: 1.1rem;
    border-radius: 5px;
    outline: none;
    border: black 1.5px solid;
    `;

export const FormButtonOutlined = styled(FormButton)`
    background: transparent;
    color: hsl(204, 45%, 20%);
    background: var(--bg-color);
    border-width: 1.5px;
    padding-inline: 7px;
`;

export const ButtonsContainer = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-left: auto;

  @media (max-width: 850px) {
    margin-top: 5px;
  } 
`;
