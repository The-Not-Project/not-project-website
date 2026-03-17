import styled from "styled-components";
import {
  FormButton,
  FormInput,
} from "../profile/personal-info/personal-info.styles";

export const PageContainer = styled.main`
  color: #cbcbcb;
  padding-block: 150px 120px;
  padding-inline: 15px;
  max-width: 600px;
  margin-inline: auto;
  height: 100vh;
  h1 {
    padding-bottom: 5px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 50px;
  }

  @media (max-width: 850px) {
    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.3rem;
      margin-bottom: 30px;
    }
  }
`;

export const UnsubscribeInput = styled(FormInput)`
  margin-bottom: 10px;
`;

export const UnsubscribeButton = styled(FormButton)`
  margin-top: 10px;
  padding-inline: 15px;
  width: auto;
`;

