import styled from "styled-components";

export const SignUpSection = styled.div`

  p {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
`;

export const SignUpForm = styled.form`

  input {
    display: block;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    font-size: 0.85rem;
    width: 250px;
    height: 25px;
    margin-bottom: 15px;
    outline: none;


    @media (max-width: 1000px) {
      width: 100%;
    }

    &::placeholder {
      color: #00000090;
    }
  }

  button {
    margin-top: 15px;
    padding: 0.25rem 1rem;
    border: 1px solid black;
    border-radius: 2rem;
    background: transparent;
    color: black;
    font-size: 0.85rem;
    width: 100px;
    height: 40px;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-start;
  }
`;


export const ConsentText = styled.p`
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  max-width: 700px;
  width: 100%;

  span {
    text-decoration: underline;
  }
`;