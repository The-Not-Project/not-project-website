import styled from "styled-components";

export const PageSection = styled.div`
  border: 1px lightgray solid;
  padding: 20px 30px;
  margin-top: 20px;
  border-radius: 7px;
  position: relative;
`;

export const SectionTitle = styled.h2`

  font-weight: normal;
  font-size: 1.8rem;
  line-height: 1.8rem;
  margin-bottom: 20px;
`;

export const StoriesSection = styled(PageSection)`
  display: flex;
  gap: 20px;
  border: none;
  padding: 0;
`