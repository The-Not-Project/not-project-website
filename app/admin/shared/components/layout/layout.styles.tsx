'use client';

import styled from 'styled-components';

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

    h1 {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
  }
`;

