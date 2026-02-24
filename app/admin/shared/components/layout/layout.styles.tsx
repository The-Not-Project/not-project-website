"use client";

import styled from "styled-components";

export const AdminContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding-top: 100px;
  min-height: 100vh;
  padding-inline: 30px;
  align-items: center;
  background: #ebebeb;
  .admin-content {
    width: 100%;
    max-width: 1200px;

    .page-title {
      font-size: 1.8rem;
      margin-bottom: 20px;

      @media (max-width: 850px) {
        font-size: 1.5rem;
      }
    }

  }
  @media (max-width: 850px) {
    padding: 70px 15px;
  }
`;
