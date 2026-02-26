import styled from "styled-components";

export const HeaderContainer = styled.header`
  min-height: 100dvh;
  max-height: 80vw;
  display: flex;
  margin-top: 70px;
  background: #e3e0d8;
  
  @media (max-width: 1100px) {
    margin-top: 60px;
    flex-direction: column;
    height: auto;
    max-height: none;
  }
`;

export const HeaderPhotoContainer = styled.div`
  width: 50%;
  padding: 70px;
  padding-bottom: 0;
  display: flex;

  background: #d9d3c8;
  @media (max-width: 1100px) {
    width: 100%;
    height: 60vh;
    padding: 30px;
  }
`;

export const HeaderPhoto = styled.div`
  height: 100%;
  flex-grow: 1;
  position: relative;
  border-radius: 100px 100px 0 0;
  overflow: hidden;
  @media (max-width: 1100px) {
    border-radius: 150px 150px 0 0;
    filter: saturate(0.7);
    max-width: 800px;
    margin-inline: auto;
  }
`;

export const HeaderDescriptionContainer = styled.div`
  width: 50%;
  padding: 150px;
  padding: 8vw;

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 850px) {
    padding: 30px;
    padding-top: 50px;
  }

  h1 {
    font-family: var(--font-georgia), serif;
    font-weight: normal;
    font-size: 4rem;
    margin-bottom: 20px;
    @media (max-width: 850px) {
      font-size: 2.5rem;
    }

    span {
      font-style: italic;
      color: #8b5e34;
    }
  }

  p {
    font-size: 1.2rem;
    color: #2a2a2ab3;
    @media (max-width: 850px) {
      font-size: 0.9rem;
      color: #2a2a2aa4;
    }
  }
`;

export const BoroughSelectionContainer = styled.div`
  margin-top: 150px;
  padding-left: 30px;
  border-left: #00000050 1px solid;
  @media (max-width: 1100px) {
    margin-top: 50px;
    padding-left: 20px;
  }

  h2 {
    font-family: var(--font-georgia), serif;
    font-weight: normal;
    font-size: 2rem;
    margin-bottom: 20px;
    @media (max-width: 850px) {
      font-size: 1.5rem;
    }
  }

  ul {
    list-style: none;
    display: flex;
    flex-flow: column;
    gap: 10px;

    @media (max-width: 850px) {
      font-size: 0.9rem;
    }

    li {
      display: flex;
      align-items: center;

      a {
        text-decoration: none;
        color: unset;
      }

      span {
        color: #8b5e34;
      }

      &::before {
        content: "";
        margin-right: 10px;
        display: inline-block;
        height: 7px;
        width: 7px;
        border-radius: 7px;
        background: #8b5e34;
        @media (max-width: 850px) {
          height: 5px;
          width: 5px;
        }
      }
    }
  }
`;
