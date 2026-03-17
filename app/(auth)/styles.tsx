import styled from "styled-components";

export const PageContainer = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  background: url("/media/preview-card.jpeg") no-repeat center center/cover;
  filter: blur(3px) brightness(50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthContainer = styled.section`
  background: #fafafa;
  padding: 30px 20px;
  border-radius: 15px;
  width: 450px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 1.5rem;
    margin-block: 20px 30px;

    @media (max-width: 768px) {
      margin-top: 40px;
    }
  }

  .redirect {
    text-align: center;
    font-size: 0.9rem;
    margin-block: 15px;
    color: #404040;

    a {
      color: inherit;
      text-decoration: none;
      font-weight: bold;
    }
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-size: 0.9rem;

    a {
      font-size: 0.8rem;
      margin-left: 5px;
      color: inherit;
    }
  }

  input {
    display: block;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: none;
    text-indent: 10px;
    font-size: 0.9rem;
    border: solid 1px #cbcbcb;
    margin-bottom: 20px;
    background: none;
  }
  ::placeholder {
    color: #ababab;
  }

  button {
    width: 100%;
    border: none;
    outline: none;
    background: #222222;
    color: #eaeaea;
    height: 40px;
    font-size: 1rem;
    border-radius: 20px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;

    &:disabled {
      background: #4a4a4a;
      cursor: not-allowed;
    }
  }
`;

export const SocialsHeader = styled.div`
  margin-block: 40px 20px;
  position: relative;

  p {
    margin: 0;
    position: relative;
    background: white;
    width: fit-content;
    margin-inline: auto;
    padding-inline: 20px;
    font-size: 0.8rem;
    color: #69696977;
    font-weight: bold;
  }

  hr {
    position: absolute;
    width: 100%;
    top: 50%;
  }
`;

export const Notice = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 40px;
  padding-inline: 20px;
  color: #404040;

  a {
    color: inherit;
  }

  @media (max-width: 768px) {
    margin-top: auto;
    margin-bottom: 20px;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 14px;
  margin-block: -15px 20px;
`;

export const SuccessMessage = styled.p`
  color: #7da67d;
  font-size: 14px;
  margin-block: -15px 20px;
`;

export const PasswordRecoveryForm = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding-left: 10px;
  margin-block: 20px;
  border: solid 1px #afafaf;

  input {
    border: none;
    margin: 0;
    font-size: 1rem;
    height: 50px;
    border-radius: 0;
  }
`;

export const Timer = styled.p`
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
`;
