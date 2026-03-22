"use client";

import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  thead {
    background: #393939;
    color: white;

    th {
      font-size: 0.9rem;

      &:first-child {
        border-top-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
      }
    }
  }

  tbody tr {
    &:nth-child(odd) {
      background-color: white;
    }
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    &.justify-right {
      display: flex;
      justify-content: right;
    }
  }

  th {
    padding-block: 15px;
    border-bottom: 1px solid #ddd;
    font-weight: 500;
  }

  @media (max-width: 850px) {
    .hide-mobile {
      display: none;
    }

    .justify-right-mobile {
      text-align: right;
      padding-right: 15px;
    }
  }
`;

export const UserTable = styled(Table)`
  overflow-x: auto;
  white-space: nowrap;
  max-width: 900px;
  margin-inline: auto;

  @media (max-width: 850px) {
    display: block;
    max-width: max-content;
  }

  .role {
    width: 0;
    div {
      display: flex;
      align-items: center;
      border-radius: 5px;
      gap: 3px;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 0.025rem;
      width: min-content;

      padding: 5px;
    }
    &.admin {
      div {
        background: #cecece;
      }
    }
  }

  .status {
    color: #707070;
    div {
      display: flex;
      align-items: center;
      gap: 3px;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 0.025rem;
    }

    &.verified {
      color: #55795d;
    }
  }
`;
