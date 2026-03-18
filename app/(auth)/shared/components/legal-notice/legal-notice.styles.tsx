import styled from "styled-components";

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