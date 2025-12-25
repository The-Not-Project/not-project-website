import styled from "styled-components";
import NextLink from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 40px;
  height: 100px;
  transition: 0.3s;
  color: white;
  position: relative;

  @media (max-width: 850px) {
    padding-inline: 20px;
    height: 60px;

    img {
      width: 80px;
      height: auto;
    }
  }

  img {
    filter: invert(0.1);
    flex-grow: 1;
  }

  &.isSpecialPage {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 3;
  }

  &.solid {
    background: rgb(13, 13, 13, 0.75);
    backdrop-filter: blur(10px);
    height: 70px;

    img {
      filter: none;
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
  margin-inline: 20px;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  transition: .2s;

  &.solid {
    color: white;
  }

  &:hover {
    color: #d5a840;
  }
`;

export const AuthContainer = styled.div`
  flex-grow: 1;
  text-align: right;
`;

export const AuthLink = styled.a`
  color: white;
  text-decoration: none;
  text-transform: capitalize;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  padding: 5px 20px;
  border-radius: 100px;
  border: 1.4px solid hsl(0, 0%, 70%);
  flex-grow: 1;

  &.solid {
  }

  @media (max-width: 850px) {
    &.bottom {
      margin-top: auto;
    }
  }
`;

export const MenuIcon = styled.div`
  color: black;
  display: block;
  margin-left: auto;
  z-index: 4;

  &.solid {
    color: white;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;

  @media (max-width: 850px) {
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: -80%;
    height: 100dvh;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: url("/media/experimental-sidebar-backdrop.jpg") no-repeat center
      center/cover;
    background: url("/media/experimental-sidebar-backdrop.jpg") no-repeat center
      center/cover;
    backdrop-filter: blur(15px);
    padding: 100px 20px 30px 20px;
    font-size: 2rem;

    &::before {
      content: "";
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
    }

    img {
      position: absolute;
      top: 15px;
      scale: 0.8;
      filter: invert(1);
    }

    & .close {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 1.6rem;
      color: #eaeaea;
    }
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
  translate: 0 100%;
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 5px;
  transition: 0.2s;
  transition-property: opacity, translate, rotate;
  z-index: 1;

  @media (max-width: 850px) {
    position: unset;
    margin-top: auto;
    background: none;
    flex-direction: row;
    translate: 0;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    color: white;
  }

  &.closed {
    opacity: 0;
    rotate: x 90deg;
    translate: 0 60%;
    pointer-events: none;
  }

  p {
    color: #ccc;
    padding: 10px 20px 5px 10px;
    margin-inline: 10px;
    border-bottom: #ccc solid 1px;
  }

  a {
    margin: 0;
    padding: 5px 20px;

    @media (min-width: 850px) {
      &:hover {
        background: #f0f0f0;
      }
    }
  }
`;

export const ProfileDropdown = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

export const ProfileIcon = styled(FaRegCircleUser)`
  scale: 1.3;
  margin-left: 10px;

  @media (max-width: 850px) {
    margin-left: 15px;
  }
`;
