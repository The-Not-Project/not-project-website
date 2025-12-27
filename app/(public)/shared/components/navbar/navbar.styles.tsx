import styled from "styled-components";
import NextLink from "next/link";

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 40px;
  transition:
    height 0.3s,
    background 0.3s,
    translate 0.18s ease-in;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  height: 70px;
  background: rgb(13, 13, 13, 0.9);
  z-index: 3;
  backdrop-filter: blur(10px);

  @media (max-width: 1000px) {
     img {
      width: 100px;
      height: auto;
    }
  }

  @media (max-width: 850px) {
    padding-inline: 25px;
    height: 60px !important;

    img {
      width: 70px;
      height: auto;
    }
  }

  &.isHomePage {
    height: 100px;
    background: none;
    backdrop-filter: none;

    img {
      filter: invert(0.1);
      flex-grow: 1;
    }
    &.solid {
      background: rgb(13, 13, 13, 0.9);
      backdrop-filter: blur(10px);
      height: 70px;
      
      img {
        filter: invert(0.25);
        @media (max-width: 850px) {
          filter: invert(0.1);
  }
      }
    }
  }

  &.shifted {
    translate: -80%;
  }

  .title-lg {
    font-size: 2.5rem;
    font-weight: normal;
    /* text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); */
    cursor: pointer;

    @media (max-width: 850px) {
      font-size: 1.5rem;
      width: max-content;
    }
  }
`;

export const ImageLink = styled(NextLink)`
  flex-grow: 1;

  @media (max-width: 850px) {
    flex-grow: 0;
  }
`;

export const DonateButton = styled.button`
  background: transparent;
  color: white;
  outline: none;
  border: 2px solid white;
  padding: 1px 10px;
  border-radius: 100px;
  font-size: 1.2rem;
  cursor: pointer;

  &.solid {
  }
`;

export const Link = styled(NextLink)`
  color: hsl(0, 0%, 90%);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 2px;
  transition: 0.2s;

  &.solid {
    color: #dbdbdb;
  }

  &:hover {
    color: #d5a840;
  }
`;

export const AuthContainer = styled.div`
  flex-grow: 1;
  text-align: right;

  @media (max-width: 850px) {
    margin-top: auto;
    flex-grow: 0;
  }
`;

export const AuthLink = styled.a`
  color: white;
  text-decoration: none;
  text-transform: capitalize;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 2px;
  padding: 5px 20px;
  border-radius: 100px;
  border: 1.4px solid hsl(0, 0%, 70%);

  &.solid {
    color: #dbdbdb;
  }

  @media (max-width: 1000px) {
    padding-inline: 10px;
  }

  @media (max-width: 850px) {
    margin-top: auto;
    border: none;
  }
`;

export const MenuIcon = styled.svg`
`;

export const LinksList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
  gap: 40px;

  @media (max-width: 1000px) {
    gap: 20px;
  }
`;

export const MobileMenu = styled.aside`
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: -80%;
  height: 100dvh;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: url("/media/boroughBackdrops/nyc.jpg") no-repeat center
    center/cover;
  backdrop-filter: blur(15px);
  padding: 150px 20px 50px 30px;

  &::before {
    content: "";
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px) saturate(0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  a {
    color: white;
    text-shadow: 0 0 2px black;
    font-size: 1.2rem;
  }

  & .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: #eaeaea;
  }
`;
