import styled from "styled-components";
import NextLink from "next/link";

export const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100px;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding-inline: 40px;
  transition:
    height 0.3s,
    background 0.3s,
    translate 0.18s ease-in;
  background: none;

  @media (max-width: 850px) {
    padding-inline: 25px;
    grid-template-columns: 1fr 1fr;
    height: 60px !important;
  }

  body[data-transparent="false"] & {
    background: rgba(13, 13, 13, 0.9);
    backdrop-filter: blur(10px);
    height: 70px;
  }
`;

export const ImageLink = styled(NextLink)`
  filter: invert(0.2);
  width: 120px;
  aspect-ratio: 20 / 11;
  height: auto;
  position: relative;

  @media (max-width: 1400px) {
    width: 100px;
  }

  @media (max-width: 850px) {
    width: 70px;
    filter: unset;
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

  &:hover {
    color: #d5a840;
  }

  @media (max-width: 1400px) {
    font-size: 0.7rem;
  }

  body[data-transparent="false"] & {
    color: #dbdbdb;

    &:hover {
      color: #d5a840;
    }
  }
`;

export const AuthContainer = styled.div`
  text-align: right;

  @media (max-width: 850px) {
    margin-top: auto;
    width: auto;
  }

  &.desktop {
    @media (max-width: 850px) {
      display: none;
    }
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
  position: relative;

  body[data-transparent="true"] & {
    color: #dbdbdb;
  }

  @media (max-width: 1400px) {
    padding-inline: 10px;
    font-size: 0.7rem;
  }

  @media (max-width: 850px) {
    border: none;
    padding: 0;
    color: white !important;
  }
`;

export const MenuIcon = styled.svg`
  justify-self: end;
  @media (min-width: 850px) {
    display: none;
  }

  body[data-menu-open="true"] & {
    display: none;
  }
`;

export const LinksList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 40px;

  @media (max-width: 1000px) {
    gap: 20px;
  }

  @media (max-width: 850px) {
    display: none;
  }
`;

export const MobileMenu = styled.aside`
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: -80%;
  height: 100dvh;
  max-height: 100dvh;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: url("/media/boroughBackdrops/nyc.webp") no-repeat center
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

  @media (min-width: 850px) {
    display: none;
  }
`;
