import styled from "styled-components";

export const SocialsContainer = styled.section`
    
`

export const Banner = styled.div`
  position: relative;
  aspect-ratio: 5 / 1;
  height: auto;
  overflow: hidden;

  img {
    filter: blur(10px) contrast(0.8) brightness(80%);
  }

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    color: #d9d9d9;
    font-size: 2.5rem;
    text-align: center;
  }

  @media (max-width: 850px) {
    aspect-ratio: 4 / 2;

    h2 {
      font-size: 1.5rem;
      width: 100%;
    }
  }
`;