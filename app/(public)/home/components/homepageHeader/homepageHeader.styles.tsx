import styled from "styled-components";

type HeaderBackgroundProps = { $position: number };

export const HeaderContainer = styled.header`
  display: block;
  height: 100vh;
  max-height: 60vw;
  color: white;
  position: relative;
  padding-top: 80px;

  @media (max-width: 850px) {
    max-height: none;
  }
`;

export const CenterTitle = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: min-content;
  text-shadow: 0 0 10px black;

  h1 {
    font-family: "GeorgiaWeb", sans-serif;
    font-size: 6rem;
    letter-spacing: 5px;
    transition: .3s;
  }

  h2 {
    font-weight: normal;
    font-size: 1rem;
    margin-bottom: 25px;
    color: hsl(45.859872611464965, 30%, 52.352941176470594%);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  p {
    margin-top: 30px;
    font-size: 1.2rem;
    text-wrap: balance;
    color: #dedede;
  }
  
  div {
    position: relative;
    height: 20px;
  }

  img {
    display: block;
  }
  
  @media (max-width: 1200px) {
    h1 {
      font-size: 3.5rem;
    }
    
    h2 {
      font-size: 0.8rem;
      margin-bottom: 5px;
    }

    p {
      font-size: 1rem;
      margin-top: 10px;
    }
  }

  @media (max-width: 850px) {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 0.7rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 0.9rem;
    }

    div {
      height: 10px;
    }
  }
`;

export const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  translate: 0;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(13, 13, 13, 0.4),
      rgba(13, 13, 13, 0.6) 75%,
      rgba(13, 13, 13, 0.9) 95%,
      rgba(13, 13, 13, 1) 100%
    );
  }
`;

export const HeaderVideo = styled.video.attrs<HeaderBackgroundProps>(
  ({ $position }) => ({
    style: {
      translate: `0 ${$position}px`,
    },
  })
)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
