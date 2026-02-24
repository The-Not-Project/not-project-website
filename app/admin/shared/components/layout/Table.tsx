// components/shared/Table.tsx
"use client";

import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  tbody tr {
    &:nth-child(odd) {
      background-color: white;
    }
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    font-size: 1.1rem;
    &.justify-right {
      display: flex;
      justify-content: right;
    }
  }

  th {
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
