import styled from "styled-components";

export const NavBarContainer = styled.nav`
  width: 100%;
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px lightgrey solid;
    gap: 30px;
    width: 100%;
    overflow: scroll;

    @media (max-width: 850px) {
      gap: 15px;
    }

    a {
      text-decoration: none;
      color: #4b4b4b;
      display: block;
      padding: 5px 3px;
      font-size: 1.1rem;
      width: max-content;

      &.active {
        border-bottom: 2px black solid;
        text-shadow:
          -0.02ex 0 0 black,
          0.02ex 0 0 black;
      }

      @media (max-width: 850px) {
        font-size: 1rem;
      }
    }
  }
`;
