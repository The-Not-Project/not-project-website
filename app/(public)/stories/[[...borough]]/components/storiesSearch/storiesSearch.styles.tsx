import styled from "styled-components";

export const StoriesSearchContainer = styled.div`
  margin-top: 20px;
  max-width: 250px;
  z-index: 1;
  position: relative;

  hr {
    margin: 30px 10px 20px 10px;
    opacity: 0.5;
    border-color: white;
  }

  @media (max-width: 1500px) {
    max-width: none;
    margin-top: 10px;
    hr {
      display: none;
    }
  }
`;

export const SearchContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border: solid 1.5px hsl(35, 45%, 88%);
  border-radius: 7px;
  padding-left: 7px;
  gap: 5px;

  svg {
    color: hsl(35, 45%, 88%);
  }

  @media (max-width: 1500px) {
    height: 50px;
    border: none;
    background: #3c3c3cc2;

    svg {
      display: none;
    }
  }
`;

export const SearchInput = styled.input`
  color: white;
  width: 200px;
  height: 40px;
  background: transparent;
  outline: none;
  border: none;
  text-indent: 5px;
  font-size: 1.1rem;

  @media (max-width: 1500px) {
    width: calc(100% - 50px);
  }
`;

export const SearchTitle = styled.h2`
  font-weight: normal;
  font-size: 1.3rem;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: white;
`;

export const SecondaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  color: white;

  @media (max-width: 1500px) {
    display: none;
  }
`;

export const FilterOptionsContainer = styled.div`
  margin-block: 5px 10px;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1500px) {
    flex-flow: row;
    overflow-x: auto;
    max-width: 100%;
    gap: 3px;
    margin-top: 10px;
  }

  p {
    color: white;
    margin-block: 5px;
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
  color: white;
  width: max-content;

  &:before {
    box-sizing: border-box;
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    translate: 0 -50%;
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #a0a0a0;
    border-radius: 6px;
    z-index: -1;
    transition: 0.25s all ease;
  }
  @media (max-width: 1500px) {
    padding-inline: 6px;
    border-radius: 5px;
    font-size: 0.9rem;
    &:before {
      content: "#";
      color: hsl(35, 45%, 88%);
      position: static;
      border: none;
      translate: 0;
      width: auto;
      height: auto;
      margin-right: 2px;
    }
  }
`;

export const FilterCheckbox = styled.input`
  display: none;
  visibility: hidden;

  @media (min-width: 1500px) {
    &:checked + label {
      padding-left: 1em;
      color: hsl(35, 20%, 10%);

      &:before {
        width: 100%;
        height: 2em;
        background: hsl(35, 25%, 88%);
        border-color: hsl(35, 25%, 80%);
      }
    }
  }

  @media (max-width: 1500px) {
    &:checked + label {
      background: hsl(40, 7%, 24%);
    }
  }
`;

export const ApplyFiltersButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  border: 2px solid #d8d6ce;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  color: #d8d6ce;
  background: none;
  height: 48px;

  svg {
    display: none;
  }

  &:hover {
    color: black;
    background-color: #d8d6ce;
  }

  @media (max-width: 1500px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: none;
    background: #bfbdb4;
    border-radius: 0 5px 5px 0;
    top: 0;
    right: 0;
    height: 50px;
    width: 50px;
    color: black;
    svg {
      display: inline;
    }

    span {
      display: none;
    }
  }
`;
