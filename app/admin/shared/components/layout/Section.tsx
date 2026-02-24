import styled from "styled-components";

export const PageSection = styled.div`
  border: 1px lightgray solid;
  padding: 20px 30px;
  margin-top: 20px;
  border-radius: 7px;
  position: relative;

  @media (max-width: 850px) {
    border: none;
    padding: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: normal;
  font-size: 1.8rem;
  line-height: 1.8rem;
  margin-bottom: 20px;
`;

export const StoriesSection = styled(PageSection)`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  border: none;
  padding: 0;

  @media (max-width: 850px) {
    display: block;
  }
`;

export const Separator = styled.hr`
  margin: 30px 0;
  border: none;
  border-top: 1px solid lightgray;
`;
