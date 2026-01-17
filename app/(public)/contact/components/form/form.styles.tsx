import styled from "styled-components";

export const FormContainer = styled.form`
  h2 {
    font-weight: normal;
    font-size: 2.3rem;
    margin-bottom: 40px;
    text-align: center;
    font-family: var(--font-georgia), serif;
  }
  @media (max-width: 850px) {
    h2 {
      font-size: 2rem;
      text-wrap: balance;
    }
  }

  label {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  input:not([type="checkbox"]) {
    width: 300px;
    height: 40px;
    font-size: 1.1rem;
    text-indent: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    outline: none;

    &:focus {
      border-color: #3c5544;
    }
  }

  input[type="checkbox"] {
    width: auto;
    height: auto;
    margin: 15px 7px 0 0;
    scale: 1.1;
  }

  textarea {
    margin-top: 15px;
    width: 100%;
    height: 200px;
    font-size: 1.1rem;
    padding: 5px;
    outline: none;
    font-family: inherit;

    &:focus {
      border-color: #3c5544;
    }
  }

  button {
    background-color: #282218;
    border: none;
    border-radius: 0.75rem;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.75rem 1.2rem;
    transition: 0.2s;
    &:hover {
      background-color: #4e4535;
    }
  }

  select {
    width: 300px;
    height: 40px;
    font-size: 1.1rem;
    text-indent: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
`;

export const CaptchaNotice = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 20px;

  a {
    text-decoration: none;
  }
`;
