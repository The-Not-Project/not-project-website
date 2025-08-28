import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

export const StoriesSearchContainer = styled.div`
  margin-top: 30px;
  max-width: 250px;
  z-index: 1;

  hr {
    margin: 30px 10px 20px 10px;
    opacity: 0.5;
  }

  @media (max-width: 1600px) {
    background: #fffdfa;
    position: absolute;
    margin-top: 0;
    border-radius: 5px;
    height: 0;
    overflow: hidden;
    border: none;
    transition: 0.3s ease;
    padding: 0 10px;
    opacity: 0;

    &.visible {
      padding: 10px;
      border: 1px solid gray;
      height: max-content;
      opacity: 1;
    }

    hr {
      display: none;
    }
  }
`;

export const SearchContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border: solid 1px gray;
  border-radius: 7px;
  padding-left: 7px;
  gap: 5px;

  svg {
    color: gray;
  }
`;

export const SearchInput = styled.input`
  width: 200px;
  height: 40px;
  background: transparent;
  outline: none;
  border: none;
  text-indent: 5px;
  font-size: 1.1rem;
`;

export const SearchTitle = styled.h2`
  font-weight: normal;
  font-size: 1.3rem;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;

  @media (max-width: 1600px) {
    cursor: pointer;
  }
`;

export const SecondaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: #454c42;
  }

  @media (max-width: 1600px) {
    text-transform: lowercase;
    margin-top: 10px;
  }
`;

export const ArrowIcon = styled(FaAngleDown)`
  margin-right: 3px;
  font-size: 1.2rem;
  transition: rotate 0.2s;
  padding: 3px;
  border-radius: 20px;

  &.rotated {
    rotate: -180deg;
  }
  @media (max-width: 1600px) {
    display: none;
  }
`;

export const FilterIcon = styled(FaFilter)`
  margin-right: 5px;
  color: #5a5a5a;
  font-size: 1rem;
  translate: 0 2px;
`;

export const FilterOptionsContainer = styled.div`
  margin-block: 5px 10px;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  height: 0;
  overflow: hidden;
  transition: height 0.2s;

  &.visible {
    height: max-content;
  }

  @media (max-width: 1600px) {
    height: fit-content;
    max-height: 250px;
    overflow-y: scroll;
  }
`;

export const FilterLabel = styled.label`
  z-index: 2;
  position: relative;
  font-size: 1.1em;
  padding-left: 1.8em;
  padding-right: 1em;
  line-height: 2;
  cursor: pointer;
  display: inline-flex;
  transition: 0.25s all ease;

  &:before {
    box-sizing: border-box;
    content: " ";
    position: absolute;
    top: 0.3em;
    left: 0;
    display: block;
    width: 1.4em;
    height: 1.4em;
    border: 2px solid #9098a9;
    border-radius: 6px;
    z-index: -1;
    transition: 0.25s all ease;
  }
`;

export const FilterCheckbox = styled.input`
  display: none;
  visibility: hidden;

  &:checked + label {
    padding-left: 1em;
    color: hsl(35, 20%, 10%);

    &:before {
      top: 0;
      width: 100%;
      height: 2em;
      background: hsl(35, 45%, 88%);
      border-color: hsl(35, 45%, 80%);
    }
  }
`;

export const ApplyFiltersButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  transition-property:
    background-color, border-color, color, box-shadow, filter;
  transition: 0.2s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  color: #57595c;
  box-shadow: inset 0 0 0 2px #57595c;
  background-color: transparent;
  height: 48px;
  &:hover {
    color: #fff;
    background-color: #57595c;
  }

  @media (max-width: 1600px) {
  }
`;

export const MobileSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;

export const MobileInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #e1e6ea;
  height: 50px;
  border-radius: 7px;
  overflow: hidden;

  input {
    flex-grow: 1;
    height: 100%;
    text-indent: 10px;
    font-size: 1em;
    border: none;
    outline: none;
    background: transparent;
  }

  button {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    background: hsl(204, 25%, 50%);
    color: #fff;
    border: none;
    font-size: 1em;
  }
`;

export const MobileCategoriesContainer = styled.div`
  display: flex;
  gap: 5px;
  padding-block: 10px;
  max-width: 100vw;
  overflow-x: scroll;
  font-size: 0.9em;

  .category {
    padding: 5px 10px;
    border-radius: 5px;
    transition: background 0.1s;
    &:before {
      content: "#";
      color: hsl(204, 10%, 60%);
    }

    &.checked {
      background: hsl(204, 25%, 80%);
    }
  }
`;
