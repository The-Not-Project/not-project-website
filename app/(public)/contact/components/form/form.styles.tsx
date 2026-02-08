import { PiEnvelopeLight } from "react-icons/pi";
import styled from "styled-components";

export const ContactContainer = styled.section`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  padding: 100px 100px 100px 50px;
  margin-inline: auto;
  max-width: 1400px;
  color: #cbcbcb;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 50px;
    padding: 50px 20px;
  }
`;

export const EnvelopeIcon = styled(PiEnvelopeLight)`
  font-size: 2.5rem;
`;

export const ContactInfo = styled.div`
  p {
    font-size: 1.5rem;
    font-weight: bold;

    a {
      color: inherit;
      display: block;
      margin-block: 10px 0px;
    }

    span {
      font-size: 0.9rem;
    }
  }
`;

export const FormContainer = styled.form`
  label {
    display: block;
    font-size: 0.9rem;
  }

  select {
    width: 300px;
    height: 40px;
    padding-left: 5px;
    border: none;
    margin-bottom: 20px;
    background: #2f2f2f;
    outline: none;
    margin-block: 5px 30px;
    color: inherit;

    @media (max-width: 850px) {
      width: 100%;
    }
  }

  input {
    width: 300px;
    height: 40px;
    font-size: 1rem;
    text-indent: 5px;
    border: none;
    background: none;
    border-bottom: 2px solid #fff;
    outline: none;
    margin-bottom: 40px;
    color: inherit;

        @media (max-width: 850px) {
      width: 100%;
    }
  }

  textarea {
    margin-top: 15px;
    width: 600px;
    height: 100px;
    padding-inline: 5px;
    outline: none;
    font-family: inherit;
    outline: none;
    background: none;
    border: none;
    border-bottom: 2px solid #fff;
    resize: none;
    color: inherit;

        @media (max-width: 850px) {
      width: 100%;
    }
  }

  button {
    background: #dbdbdb;
    border: none;
    border-radius: 100px;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
    padding: 10px 40px;
    transition: 0.2s;
    &:hover {
      background: #d4d4d4;
    }
  }
`;

export const CaptchaNotice = styled.p`
  font-size: 0.8rem;
  color: #b7b7b7;
  margin-bottom: 20px;

  a {
    color: inherit;
    font-weight: bold;
  }
`;
