import styled from "styled-components";
import { BeatLoader } from "react-spinners";

export const SearchContainer = styled.div`
  margin: 40px auto 20px auto;
  width: 70%;
  height: 40px;
  border-radius: 100px;
  overflow: hidden;
  box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.1);

  input {
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    border: none;
    outline: none;

    &::placeholder {
      color: #aaa;
      font-size: 1.1rem;
    }
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;

export const Loader = styled(BeatLoader)`
  margin: 30px auto 10px auto;
  width: max-content;
`;
